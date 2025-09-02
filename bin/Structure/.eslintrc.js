module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended' // Disables conflicting rules
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        // Prettier-specific rules
        'prettier/prettier': [
            'error',
            {
                arrowParens: 'always',
                bracketSameLine: false,
                bracketSpacing: true,
                singleQuote: true,
                trailingComma: 'none',
                tabWidth: 4,
                semi: true,
                endOfLine: 'lf',
                singleAttributePerLine: true,
                printWidth: 100
            }
        ],

        // Disable ESLint's indent rule completely
        indent: 'off',
        '@typescript-eslint/indent': 'off',

        // Other rules
        'no-nested-ternary': 'off',
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
        // TypeScript-specific rules
        '@typescript-eslint/no-explicit-any': 'off'
    }
};
