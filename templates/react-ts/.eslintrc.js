module.exports = {
  root: true,
  extends: ['@iszf-microfrontends/eslint-config'],
  plugins: ['react-refresh'],
  ignorePatterns: ['webpack'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
