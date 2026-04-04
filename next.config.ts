import type { NextConfig } from 'next';

const isPWAEnabled = process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ENABLE_PWA !== 'false';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = isPWAEnabled ? require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  navigateFallback: '/offline.html',
  publicExcludes: [
    '!manifest.json',
  ],
  runtimeCaching: [
    {
      urlPattern: /\.(?:js|css|woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif|ico|webp|avif|mp3|ogg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'deutschflash-static',
        expiration: {
          maxEntries: 500,
          maxAgeSeconds: 365 * 24 * 60 * 60,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /\.html$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'deutschflash-pages',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        },
      },
    },
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'deutschflash-cache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
}) : (config: NextConfig) => config;

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
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
