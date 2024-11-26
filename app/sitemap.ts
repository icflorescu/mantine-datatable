import type { MetadataRoute } from 'next';
import { ROUTES, WEBSITE_LINK } from './config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${WEBSITE_LINK}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...ROUTES.filter(({ href }) => href.startsWith('/') && href !== '/').map(({ href }) => ({
      url: `${WEBSITE_LINK}${href}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
