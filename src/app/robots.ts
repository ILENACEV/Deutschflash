import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/session/',
        '/settings/',
        '/api/',
        '/_next/',
        '/mistakes/',
        '/import/'
      ],
    },
    sitemap: 'https://www.deutschflash.mk/sitemap.xml',
  };
}
