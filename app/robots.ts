import { MetadataRoute } from 'next';
import { WEBSITE_LINK } from './config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${WEBSITE_LINK}/sitemap.xml`,
  };
}
