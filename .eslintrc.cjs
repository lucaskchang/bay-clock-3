module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:vue/vue3-essential',
  ],
  rules: {
    semi: [2, 'always'],
    quotes: [2, 'single'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': [
      'error',
      {
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 80,
        plugins: ['prettier-plugin-tailwindcss'],
      },
    ],
    'vue/multi-word-component-names': 'off',
  },
  plugins: ['prettier'],
};
