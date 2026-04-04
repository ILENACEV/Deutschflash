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
  const { STORIES_DATA } = require('@/lib/stories-data');
  const storyRoutes = (STORIES_DATA || []).map((story: any) => ({
    url: `${baseUrl}/stories/${story.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...storyRoutes];
}
