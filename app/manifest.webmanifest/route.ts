import type { MetadataRoute } from 'next';
import { PRODUCT_DESCRIPTION, PRODUCT_NAME, WEBSITE_LINK } from '~/app/config';

/**
 * todo move this to a manifest.ts file as soon as the bug in Next.js is fixed
 * we need to use this instead of a manifest.ts due to a bug in Next.js
 * (@see https://github.com/vercel/next.js/issues/56687)
 */

const data: MetadataRoute.Manifest = {
  name: `Enhance your users’ experience with ${PRODUCT_NAME}`,
  short_name: PRODUCT_NAME,
  description: PRODUCT_DESCRIPTION,
  start_url: './',
  scope: '.',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#1971c2',
  icons: [
    {
      src: `${process.env.GITHUB_PAGES === 'TRUE' ? WEBSITE_LINK : ''}/icon.svg`,
      sizes: 'any',
    },
  ],
};

export const GET = () => Response.json(data);
