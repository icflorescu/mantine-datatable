import type { MetadataRoute } from 'next';
import { WEBSITE_LINK } from './config';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${WEBSITE_LINK}/sitemap.xml`,
  };
}
