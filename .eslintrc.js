module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['next', 'prettier', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
