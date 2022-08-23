import transpileModules from 'next-transpile-modules';
import pkg from '../package/package.json' assert { type: 'json' };

const withTM = transpileModules(['mantine-datatable']);

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  env: {
    PACKAGE_VERSION: pkg.version,
  },
};

export default withTM(config);
