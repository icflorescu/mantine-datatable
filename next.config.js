/* eslint-disable @typescript-eslint/no-require-imports */
const { name: PACKAGE_NAME, version: PACKAGE_VERSION } = require('./package.json');

module.exports = async () => {
  const { downloads } = await fetch('https://api.npmjs.org/downloads/point/last-month/mantine-datatable')
    .then((res) => res.json())
    .catch(() => ({ downloads: 0 }));

  /**
   * @type {import('next').NextConfig}
   */
  const config = {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
    experimental: {
      typedRoutes: true,
      optimizePackageImports: [
        '@mantine/code-highlight',
        '@mantine/core',
        '@mantine/dates',
        '@mantine/hooks',
        '@mantine/modals',
        '@mantine/notifications',
      ],
    },
    env: {
      GITHUB_PAGES: String(process.env.GITHUB_PAGES === 'TRUE' || false).toUpperCase(),
      PACKAGE_NAME,
      PACKAGE_VERSION,
      INITIAL_NPM_DOWNLOADS: String(downloads),
    },
  };

  if (process.env.GITHUB_PAGES) config.basePath = '/mantine-datatable';

  return config;
};
