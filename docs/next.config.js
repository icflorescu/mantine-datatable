/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('@ducanh2912/next-pwa').default({ dest: 'public' });
const { version: PACKAGE_VERSION } = require('./package.json');

module.exports = async (phase) => {
  const { downloads } = await fetch('https://api.npmjs.org/downloads/point/last-month/mantine-datatable')
    .then((res) => res.json())
    .catch(() => ({ downloads: 0 }));

  /**
   * @type {import('next').NextConfig}
   */
  const config = {
    output: 'export',
    reactStrictMode: true,
    transpilePackages: ['mantine-datatable'],
    env: {
      PACKAGE_VERSION,
      BASE_PATH: '',
      INITIAL_NPM_DOWNLOADS: String(downloads),
    },
  };

  if (phase === 'phase-production-build' && process.env.GITHUB_PAGES === 'true') {
    config.env.BASE_PATH = config.basePath = '/mantine-datatable';
    config.env.CANONICAL_URL = 'https://icflorescu.github.io/mantine-datatable/';
  }

  return withPWA(config);
};
