module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['dist', 'bin', 'templates', 'rollup.config.js', '.eslintrc.cjs'],
  extends: ['standard', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-explicit-any': 'off',

    'arrow-body-style': ['error', 'as-needed'],
    'prefer-template': 'error',
  },
};
