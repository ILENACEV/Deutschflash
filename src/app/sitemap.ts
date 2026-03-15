import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.deutschflash.mk';
  
  // Basic routes
  const routes = [
    '',
    '/dashboard',
    '/goethe',
    '/test',
    '/words',
    '/spelling',
    '/listening',
    '/stories',
    '/cases',
    '/verbs',
    '/wordle',
    '/dialogs',
    '/phrases',
    '/lessons',
    '/privacy',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In a real app, you would fetch blog slugs, stories IDs, etc. from your data files
  // and add them here dynamically.

  return [...routes];
}
