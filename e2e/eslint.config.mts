import playwright from 'eslint-plugin-playwright';

import baseConfig from '../eslint.base.config.mts';

export default [
  ...baseConfig,
  playwright.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.js'],
    // Override or add rules here
    rules: {},
  },
];
