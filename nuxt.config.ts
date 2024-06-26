// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Bay Clock 3',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/ico',
          href: '/favicon.ico',
        },
      ],
    },
  },
  css: ['@/assets/styles/main.scss'],
  typescript: {
    strict: true,
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-gtag',
    '@nuxt/eslint',
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
  eslint: {
    config: {
      stylistic: true,
    },
  },
});
