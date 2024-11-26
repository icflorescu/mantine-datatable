import type { MetadataRoute } from 'next';
import { PRODUCT_DESCRIPTION, PRODUCT_NAME } from '~/app/config';

/**
 * todo move this to a manifest.ts file as soon as the bug in Next.js is fixed
 * we need to use this instead of a manifest.ts due to a bug in Next.js
 * (@see https://github.com/vercel/next.js/issues/56687)
 */

export const dynamic = 'force-static';

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
      src: `${process.env.GITHUB_PAGES === 'TRUE' ? `/${process.env.PACKAGE_NAME}` : ''}/icon.svg`,
      type: 'image/svg+xml',
      sizes: 'any',
      purpose: 'any',
    },
  ],
};

export const GET = () => Response.json(data);
