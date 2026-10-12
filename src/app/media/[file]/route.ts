import { readFile } from '@/lib/storage';

const TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
};

/** Serves images uploaded from the admin panel. File names are random and never reused, so they cache forever. */
export async function GET(_request: Request, { params }: RouteContext<'/media/[file]'>) {
  const { file } = await params;
  const match = /^[a-z0-9-]+\.(jpg|png|gif|webp|avif)$/.exec(file);
  if (!match) return new Response('Not found', { status: 404 });

  const stored = await readFile(`media/${file}`);
  if (!stored) return new Response('Not found', { status: 404 });

  return new Response(stored.data, {
    headers: {
      'Content-Type': TYPES[match[1]],
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; sandbox",
    },
  });
}
