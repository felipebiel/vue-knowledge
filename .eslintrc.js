module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting',
        'plugin:storybook/recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['warn', 4, { SwitchCase: 1 }],
        'no-tabs': 'off',
        'max-len': ['warn', { code: 140, ignoreStrings: true }],
        'no-alert': 'off',
        'object-property-newline': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'require-jsdoc': 'off',
        'no-invalid-this': 'off',
        'brace-style': 'off',
        camelcase: 'warn',
        'object-curly-spacing': 'off',
        quotes: ['error', 'single'],
    },
};
