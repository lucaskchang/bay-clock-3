<template>
  <div class="space-y-4">
    <p class="text-xl font-semibold">Name</p>
    <UInput
      v-model="activityName"
      placeholder="Activities + Sports/Drama"
      class="w-full"
    />
    <p class="text-xl font-semibold">Schedule</p>
    <div class="flex flex-col space-y-4">
      <div
        v-for="day in Object.keys(activityDays)"
        :key="day"
        class="flex flex-row items-center gap-4"
        :class="{ 'text-gray-400': !activityDays[day] }"
      >
        <UCheckbox v-model="activityDays[day]" />
        <p class="font-semibold">
          {{ day }}
        </p>
        <UInput
          v-model="activitySchedule[day].start"
          placeholder="Enter a club name"
          type="time"
          class="w-full"
          :disabled="!activityDays[day]"
        />
        <p>-</p>
        <UInput
          v-model="activitySchedule[day].end"
          placeholder="Enter a club name"
          type="time"
          class="w-full"
          :disabled="!activityDays[day]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustomScheduleStore } from '~/stores/customSchedule';

const customScheduleStore = useCustomScheduleStore();
const { activityName, activityDays, activitySchedule } =
  storeToRefs(customScheduleStore);
</script>
