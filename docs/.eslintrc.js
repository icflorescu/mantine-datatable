// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../.eslintrc.js');
config.rules = { ...config.rules, '@next/next/no-html-link-for-pages': 'off' };
module.exports = config;
