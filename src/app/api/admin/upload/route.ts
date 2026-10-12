import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin-auth';
import { writeFile } from '@/lib/storage';

// Netlify functions accept request bodies up to 6 MB, so keep uploads comfortably below that.
const MAX_BYTES = 4 * 1024 * 1024;

const ascii = (bytes: Uint8Array, start: number, end: number) => String.fromCharCode(...bytes.slice(start, end));

/** Detects the image type from the file's first bytes rather than trusting its name or MIME type. */
function sniffImage(bytes: Uint8Array): { ext: string; type: string } | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { ext: 'jpg', type: 'image/jpeg' };
  if (ascii(bytes, 0, 8) === '\x89PNG\r\n\x1a\n') return { ext: 'png', type: 'image/png' };
  if (ascii(bytes, 0, 4) === 'GIF8') return { ext: 'gif', type: 'image/gif' };
  if (ascii(bytes, 0, 4) === 'RIFF' && ascii(bytes, 8, 12) === 'WEBP') return { ext: 'webp', type: 'image/webp' };
  if (ascii(bytes, 4, 8) === 'ftyp' && ['avif', 'avis'].includes(ascii(bytes, 8, 12))) {
    return { ext: 'avif', type: 'image/avif' };
  }
  return null;
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 });
  }
  // Same-origin check on top of the SameSite session cookie.
  const origin = request.headers.get('origin');
  const hosts = [request.headers.get('host'), request.headers.get('x-forwarded-host')];
  let originHost: string | null = null;
  try {
    originHost = origin ? new URL(origin).host : null;
  } catch {}
  if (origin && !hosts.includes(originHost)) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  }

  let file: FormDataEntryValue | null;
  try {
    file = (await request.formData()).get('file');
  } catch {
    return NextResponse.json({ error: 'Invalid upload.' }, { status: 400 });
  }
  if (!(file instanceof File)) return NextResponse.json({ error: 'No file received.' }, { status: 400 });
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Image is too large. Maximum size is 4 MB.' }, { status: 413 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const image = sniffImage(bytes);
  if (!image) {
    return NextResponse.json({ error: 'Only JPG, PNG, WebP, GIF or AVIF images are allowed.' }, { status: 415 });
  }

  const name = `${randomUUID()}.${image.ext}`;
  try {
    await writeFile(`media/${name}`, bytes, image.type);
  } catch (err) {
    console.error('[admin] upload failed', err);
    return NextResponse.json({ error: 'Could not store the image. Please try again.' }, { status: 500 });
  }
  return NextResponse.json({ src: `/media/${name}` });
}
