// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-gtag',
    '@nuxt/eslint',
  ],
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

  colorMode: {
    classSuffix: '',
  },

  routeRules: {
    '/**': { prerender: true },
  },

  compatibilityDate: '2025-01-20',

  nitro: {
    prerender: {
      routes: ['/', '/focus', '/schedule'],
    },
  },

  typescript: {
    strict: true,
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  gtag: {
    id: 'G-FVNXPL0FCK',
  },
});
