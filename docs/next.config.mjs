import transpileModules from 'next-transpile-modules';
import pkg from '../package/package.json' assert { type: 'json' };

const withTM = transpileModules(['mantine-datatable']);

const nextConfig = (phase) => {
  /**
   * @type {import('next').NextConfig}
   */
  const config = {
    reactStrictMode: true,
    env: {
      PACKAGE_VERSION: pkg.version,
    },
  };

  if (phase === 'phase-production-build' && process.env.GITHUB_PAGES === 'true') {
    config.basePath = '/mantine-datatable';
    config.trailingSlash = true;
  }

  return withTM(config);
};

export default nextConfig;
