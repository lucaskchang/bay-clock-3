// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    contentfulKey: '',
  },
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
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-gtag',
    '@nuxt/eslint',
  ],
  image: {
    contentful: {
      baseURL: 'https://images.ctfassets.net/',
    },
  },
  colorMode: {
    classSuffix: '',
  },
  gtag: {
    id: 'G-FVNXPL0FCK',
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
});
