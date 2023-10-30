<template>
  <div class="mx-auto pt-10 text-center font-serif lg:w-1/2 px-10">
    <p class="mb-2 text-5xl">Lukaja's Nuxt Template</p>
    <p class="text-lg">
      My Nuxt Template used for personal projects. It includes TailwindCSS,
      Prettier, ESLint, TypeScript, and more.
    </p>
    <p class="mt-4 text-xl">Dependencies</p>
    <p
      v-for="(version, dependency) of devDependencies"
      :key="dependency"
      class="text-center text-xl"
    >
      {{ dependency }}: {{ version.replace('^', '') }}
    </p>
    <button
      class="ring-1 ring-black dark:ring-white font-bold py-2 px-4 rounded mt-4 text-md"
      @click="
        $colorMode.preference = $colorMode.value === 'light' ? 'dark' : 'light'
      "
    >
      Toggle Dark Mode
    </button>
  </div>
</template>

<script setup lang="ts">
const devDependencies = {
  '@nuxt/devtools': '^1.0.0',
  '@nuxt/eslint-config': '^0.2.0',
  '@nuxtjs/color-mode': '^3.3.0',
  '@nuxtjs/eslint-module': '^4.1.0',
  '@nuxtjs/tailwindcss': '^6.8.0',
  '@tailwindcss/typography': '^0.5.10',
  '@types/node': '^20.8.7',
  '@typescript-eslint/parser': '^6.8.0',
  eslint: '^8.52.0',
  'eslint-config-prettier': '^9.0.0',
  'eslint-loader': '^4.0.2',
  'eslint-plugin-prettier': '^5.0.1',
  'eslint-plugin-vue': '^9.14.1',
  nuxt: '^3.8.0',
  'nuxt-gtag': '^1.1.1',
  'nuxt-icon': '^0.5.0',
  prettier: '^3.0.3',
  'prettier-plugin-tailwindcss': '^0.5.6',
  sass: '^1.63.3',
};
</script>
