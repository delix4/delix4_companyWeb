import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== 'production';

/*
 * Content-Security-Policy. The site loads no third-party scripts, styles or fonts (next/font
 * self-hosts them), so everything is limited to this origin. 'unsafe-inline' is needed for
 * Next.js' inline bootstrap/JSON-LD scripts and Framer Motion's inline styles; the dev server
 * additionally needs eval and a websocket for hot reload.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
  "frame-src 'none'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const nextConfig: NextConfig = {
  experimental: {
    // Since Next.js 16.3 the build cache is on by default and it records environment variable
    // values, so secrets such as ADMIN_PASSWORD would be written into .next/cache (Netlify's
    // secret scanner rightly fails the deploy). Builds are fast enough without it.
    turbopackFileSystemCacheForBuild: false,
  },
  reactCompiler: true,
  devIndicators: false,
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async redirects() {
    return [{ source: '/projects', destination: '/case-studies', permanent: true }];
  },

  async headers() {
    return [
      {
        // Static brand assets rarely change; let browsers and CDNs cache them.
        source: '/:file(logo.png|logo-mark.png|tablogo.png)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
      {
        // Admin pages are never framed. A later matching rule overrides the SAMEORIGIN value above.
        source: '/admin/:path*',
        headers: [{ key: 'X-Frame-Options', value: 'DENY' }],
      },
    ];
  },
};

export default nextConfig;
