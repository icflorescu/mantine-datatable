import nextConfig from 'eslint-config-next';
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextConfig,
  ...coreWebVitals,
  ...nextTypescript,
  {
    ignores: ['.next/', 'next-env.d.ts', 'out/', 'dist/', 'public/'],
  },
  {
    rules: {
      'no-console': 'error',
      'object-shorthand': 'error',
      'no-useless-rename': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@next/next/no-img-element': 'off',
    },
  },
];

export default eslintConfig;
