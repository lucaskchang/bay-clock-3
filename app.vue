<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useNowStore } from '~/stores/now';

const nowStore = useNowStore();
const { updateTimeLoop } = nowStore;

onMounted(() => {
  updateTimeLoop();
});
</script>
