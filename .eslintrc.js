module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['next', 'prettier', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
