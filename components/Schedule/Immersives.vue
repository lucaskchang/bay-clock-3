<template>
  <div>
    <p class="mb-2 text-xl font-semibold">Immersive Name</p>
    <UInput v-model="immersiveName" placeholder="Immersive" class="w-full" />
  </div>
</template>

<script setup lang="ts">
import { useCustomScheduleStore } from '@/stores/customSchedule';

const customScheduleStore = useCustomScheduleStore();
const { immersiveName } = storeToRefs(customScheduleStore);
</script>
