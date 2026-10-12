import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { getStore } from '@netlify/blobs';

/*
 * Key/value storage for admin-managed content (projects, testimonials, uploaded images).
 *
 * On Netlify this uses Netlify Blobs, which persists across deploys with no extra setup.
 * Everywhere else (local `npm run dev` / `npm start`) it falls back to files in `.data/`.
 * Set CONTENT_STORAGE=netlify or CONTENT_STORAGE=file to force one backend.
 */

const STORE_NAME = 'delix4-content';
const LOCAL_DIR = path.join(process.cwd(), '.data');
const KEY_PATTERN = /^[a-z0-9][a-z0-9/_.-]{0,200}$/;

const onNetlify = () => {
  const forced = process.env.CONTENT_STORAGE;
  if (forced === 'netlify') return true;
  if (forced === 'file') return false;
  return Boolean(
    (globalThis as { netlifyBlobsContext?: unknown }).netlifyBlobsContext ||
      process.env.NETLIFY_BLOBS_CONTEXT
  );
};

const store = () => getStore({ name: STORE_NAME, consistency: 'strong' });

function assertKey(key: string) {
  if (!KEY_PATTERN.test(key) || key.includes('..')) throw new Error(`Invalid storage key: ${key}`);
}

const localPath = (key: string) => path.join(LOCAL_DIR, ...key.split('/'));

async function writeLocal(key: string, data: Uint8Array | string) {
  const file = localPath(key);
  await fs.mkdir(path.dirname(file), { recursive: true });
  // Write then rename so a crash never leaves a half-written JSON file.
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, data);
  await fs.rename(tmp, file);
}

const isMissing = (err: unknown) => (err as NodeJS.ErrnoException)?.code === 'ENOENT';

export async function readJSON<T>(key: string): Promise<T | null> {
  assertKey(key);
  if (onNetlify()) return ((await store().get(key, { type: 'json' })) as T | null) ?? null;
  try {
    return JSON.parse(await fs.readFile(localPath(key), 'utf8')) as T;
  } catch (err) {
    if (isMissing(err)) return null;
    throw err;
  }
}

export async function writeJSON(key: string, data: unknown) {
  assertKey(key);
  if (onNetlify()) {
    await store().setJSON(key, data);
    return;
  }
  await writeLocal(key, JSON.stringify(data, null, 2));
}

export async function writeFile(key: string, data: Uint8Array, contentType: string) {
  assertKey(key);
  if (onNetlify()) {
    await store().set(key, new Blob([data as BlobPart], { type: contentType }), { metadata: { contentType } });
    return;
  }
  await writeLocal(key, data);
}

export async function readFile(key: string): Promise<{ data: ArrayBuffer; contentType?: string } | null> {
  assertKey(key);
  if (onNetlify()) {
    const result = await store().getWithMetadata(key, { type: 'arrayBuffer' });
    if (!result) return null;
    const contentType = typeof result.metadata?.contentType === 'string' ? result.metadata.contentType : undefined;
    return { data: result.data, contentType };
  }
  try {
    const buf = await fs.readFile(localPath(key));
    return { data: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer };
  } catch (err) {
    if (isMissing(err)) return null;
    throw err;
  }
}

export async function removeKey(key: string) {
  assertKey(key);
  if (onNetlify()) {
    await store().delete(key);
    return;
  }
  await fs.rm(localPath(key), { force: true });
}
