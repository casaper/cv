import nx from '@nx/eslint-plugin';
import { Linter } from '@typescript-eslint/utils/ts-eslint';
import importPlugin from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export const ignores = [
  ...[
    'node_modules',
    '.nx',
    'dist',
    'coverage',
    'public',
    'tmp',
    '.angular',
    'project-files',
    '.vscode',
    '.idea',
  ].map(d => `**/${d}`),
];

export const prettierAndImportSorting = {
  ...eslintPluginPrettierRecommended,
  files: ['ts', 'tsx', 'cts', 'mts', 'js', 'jsx', 'cjs', 'mjs'].map(
    e => `**/*.${e}`
  ),
  plugins: {
    'simple-import-sort': simpleImportSort,
    import: importPlugin,
    prettier: pluginPrettier,
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_.*',
        caughtErrorsIgnorePattern: 'e',
        caughtErrors: 'all',
        args: 'all',
      },
    ],
    'arrow-parens': ['error', 'as-needed'],
    'linebreak-style': ['error', 'unix'],
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],

    'prettier/prettier': [
      'error',
      {
        usePrettierrc: true,
      },
    ],
  },
} satisfies Linter.ConfigType;

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  { ignores: ['**/dist'] },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  prettierAndImportSorting,
  { ignores },
];
