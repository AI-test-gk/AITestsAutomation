const js = require('@eslint/js');
const globals = require('globals');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
    {
        ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**']
    },
    js.configs.recommended,
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021
            }
        },
        rules: {
            'no-unused-vars': ['warn', {argsIgnorePattern: '^_'}]
        }
    },
    {
        files: ['tests/**/*.js'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.browser,
                ...globals.es2021,
                beforeEach: 'readonly',
                afterEach: 'readonly',
                describe: 'readonly',
                it: 'readonly'
            }
        }
    },
    eslintConfigPrettier
];
