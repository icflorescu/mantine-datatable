import pwa from 'next-pwa';
import pkg from '../package/package.json' assert { type: 'json' };

const withPWA = pwa({ dest: 'public', disable: process.env.NODE_ENV === 'development' });

const nextConfig = (phase) => {
  /**
   * @type {import('next').NextConfig}
   */
  const config = {
    output: 'export',
    reactStrictMode: true,
    transpilePackages: ['mantine-datatable'],
    env: {
      PACKAGE_VERSION: pkg.version,
      BASE_PATH: '',
    },
  };

  if (phase === 'phase-production-build' && process.env.GITHUB_PAGES === 'true') {
    config.env.BASE_PATH = config.basePath = '/mantine-datatable';
    config.env.CANONICAL_URL = 'https://icflorescu.github.io/mantine-datatable/';
  }

  return withPWA(config);
};

export default nextConfig;
