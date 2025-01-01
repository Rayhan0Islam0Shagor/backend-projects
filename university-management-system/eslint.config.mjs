import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      'prefer-const': ['error', { destructuring: 'all' }],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-undef': 'error',
    },
  },
  { globals: { process: 'readonly' } },
  eslintPluginPrettierRecommended,
];
