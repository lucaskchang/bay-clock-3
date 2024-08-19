import tailwind from 'eslint-plugin-tailwindcss';
import vue from 'eslint-plugin-vue';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  tailwind.configs['flat/recommended'],
  vue.configs['flat/recommended'],
  {
    rules: {
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      'vue/multi-word-component-names': 'off',
      'tailwindcss/no-custom-classname': 'off',
    },
    ignores: [
      'node_modules',
      '.nuxt',
      '.output',
    ],
  },
);
