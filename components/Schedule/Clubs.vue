<template>
  <div class="flex flex-col space-y-4">
    <div
      v-for="day in Object.keys(clubs)"
      :key="day"
      class="flex flex-row items-center gap-4"
    >
      <p class="font-semibold">
        {{ day }}
      </p>
      <UInput
        v-model="clubs[day]"
        placeholder="Enter a club name"
        class="w-full min-w-36"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustomScheduleStore } from '~/stores/customSchedule';

const customScheduleStore = useCustomScheduleStore();
const { clubs } = storeToRefs(customScheduleStore);
</script>
