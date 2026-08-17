<template>
  <div>
    <Header />
    <ProgressBars />
    <ButtonBar />

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
useHead({
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
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Bay Clock',
        'url': 'https://bayclock.org/',
        'description': 'Bay Clock is a customizable schedule viewer for students at The Bay School of San Francisco.',
      }),
    },
  ],
});

useSeoMeta({
  description: 'Bay Clock is a customizable schedule viewer for students at The Bay School of San Francisco.',
  ogTitle: 'Bay Clock 3',
  ogDescription: 'Bay Clock is a customizable schedule viewer for students at The Bay School of San Francisco.',
  ogImage: '/preview.png',
  ogUrl: 'https://bayclock.org/',
  twitterTitle: 'Bay Clock 3',
  twitterDescription: 'Bay Clock is a customizable schedule viewer for students at The Bay School of San Francisco.',
  twitterImage: '/preview.png',
  twitterCard: 'summary',
});
</script>
