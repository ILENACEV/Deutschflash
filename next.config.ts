import type { NextConfig } from 'next';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // Офлајн страница кога нема интернет - користи navigateFallback
  navigateFallback: '/offline.html',
  // Не исклучувај ги иконите од јавните ресурси
  publicExcludes: [
    '!manifest.json',
  ],
  runtimeCaching: [
    // CacheFirst за статички ресурси - офлајн приоритет
    {
      urlPattern: /\.(?:js|css|woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif|ico|webp|avif)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'deutschflash-static',
        expiration: {
          maxEntries: 500,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 година
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // StaleWhileRevalidate за HTML страници
    {
      urlPattern: /\.html$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'deutschflash-pages',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 дена
        },
      },
    },
    // NetworkFirst за API барања (fallback to cache)
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'deutschflash-cache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дена
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Use Turbopack in dev, Webpack for PWA in production
  turbopack: {},
};

export default withPWA(nextConfig);
