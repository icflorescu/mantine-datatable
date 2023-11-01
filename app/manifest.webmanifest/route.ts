import type { MetadataRoute } from 'next';
import { PRODUCT_DESCRIPTION, PRODUCT_NAME } from '~/app/config';

/**
 * todo move this to a manifest.ts file as soon as the bug in Next.js is fixed
 * we need to use this instead of a manifest.ts due to a bug in Next.js
 * (@see https://github.com/vercel/next.js/issues/56687)
 */

const urlPrefix = process.env.GITHUB_PAGES === 'TRUE' ? `/${process.env.PACKAGE_NAME}` : '';

const data: MetadataRoute.Manifest = {
  name: PRODUCT_NAME,
  short_name: PRODUCT_NAME,
  description: PRODUCT_DESCRIPTION,
  start_url: './',
  scope: '.',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#1971c2',
  icons: [
    {
      src: `${urlPrefix}/icon.svg`,
      type: 'image/svg+xml',
      sizes: 'any',
    },
    {
      src: `${urlPrefix}/icon-192.png`,
      type: 'image/png',
      sizes: '192x192',
    },
    {
      src: `${urlPrefix}/icon-512.png`,
      type: 'image/png',
      sizes: '512x512',
    },
  ],
};

export const GET = () => Response.json(data);
