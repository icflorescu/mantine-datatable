import { execFileSync } from 'node:child_process';
import type { MetadataRoute } from 'next';
import { ROUTES, WEBSITE_LINK } from './config';

export const dynamic = 'force-static';

/**
 * Returns the date of the last commit touching the given route folder,
 * so search engines get meaningful `lastmod` values instead of the build date.
 */
function getLastModified(dir: string) {
  try {
    const date = execFileSync('git', ['log', '-1', '--format=%cI', '--', dir], { encoding: 'utf8' }).trim();
    if (date) return new Date(date);
  } catch {
    // git not available; fall back to the build date
  }
  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${WEBSITE_LINK}/`, lastModified: getLastModified('app/(home)') },
    ...ROUTES.filter(({ href }) => href.startsWith('/') && href !== '/').map(({ href }) => ({
      url: `${WEBSITE_LINK}${href}/`,
      lastModified: getLastModified(`app${href}`),
    })),
  ];
}
