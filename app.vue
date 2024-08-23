<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useNowStore } from '~/stores/now';
import { useContentfulStore } from '~/stores/contentful';

const contentfulStore = useContentfulStore();
await contentfulStore.loadSpace();

const nowStore = useNowStore();
const { updateTimeLoop } = nowStore;

onMounted(() => {
  updateTimeLoop();
});
</script>
