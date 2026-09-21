/** @type {import('next').NextConfig} */

// English lives at the root (no /en prefix) so every existing URL stays the same.
// Internally it is served from the same per-language tree: app/[lang] with lang = "en".
const EN_PATHS = [
  '/heic-to-jpg', '/heic-to-png', '/heic-to-webp', '/heic-to-pdf', '/batch-heic-converter',
  '/about', '/privacy-policy', '/terms', '/contact', '/guides'
];

const backend = process.env.BACKEND_URL; // e.g. https://api.heic2.tools  (optional Node backend)

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { globalNotFound: true },

  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/en' },
        ...EN_PATHS.map((p) => ({ source: p, destination: `/en${p}` })),
        { source: '/guides/:slug', destination: '/en/guides/:slug' }
      ],
      afterFiles: backend ? [{ source: '/api/:path*', destination: `${backend}/api/:path*` }] : []
    };
  },

  async redirects() {
    // /en/... would duplicate the unprefixed English pages
    return [
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true }
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ]
      }
    ];
  }
};

export default nextConfig;
