<template>
  <div class="space-y-4">
    <p class="text-xl font-semibold">Classes</p>
    <UInput
      v-for="name in Object.keys(blockNames).splice(0, 6)"
      :key="name"
      v-model="blockNames[name]"
      :placeholder="name"
    />
    <UDivider />
    <p class="text-xl font-semibold">Other</p>
    <UInput
      v-for="name in Object.keys(blockNames).splice(6, 9)"
      :key="name"
      v-model="blockNames[name]"
      :placeholder="name"
    />
    <UInput
      v-if="specialFlexName"
      v-model="customSpecialFlexName"
      :placeholder="specialFlexName"
    />
  </div>
</template>

<script setup lang="ts">
import { useCustomScheduleStore } from '@/stores/customSchedule';

const customScheduleStore = useCustomScheduleStore();
const { blockNames, specialFlexName, customSpecialFlexName } =
  storeToRefs(customScheduleStore);
</script>
