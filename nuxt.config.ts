// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Bay Clock 3',
    },
  },
  css: ['@/assets/styles/main.scss'],
  typescript: {
    strict: true,
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-gtag',
  ],
  colorMode: {
    classSuffix: '',
  },
  gtag: {
    id: 'G-FVNXPL0FCK',
  },
  googleFonts: {
    families: {
      Inter: true,
    },
  },
});
