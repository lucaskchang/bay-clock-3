<template>
  <div
    class="flex flex-col justify-between text-6xl font-bold tracking-tight md:flex-row md:px-2 md:pt-2 md:text-7xl"
  >
    <div v-if="showClock" class="flex flex-row md:flex-col">{{ clock }}</div>
    <div v-if="showStatus" class="flex flex-row md:flex-col">
      {{ statusMessage }}
    </div>
  </div>
  <div
    class="flex flex-col justify-between text-4xl font-bold tracking-tight text-gray-600 dark:text-gray-400 md:flex-row md:px-2 md:text-5xl"
  >
    <div v-if="showDate" class="flex-row md:flex-col">{{ date }}</div>
    <div
      v-if="scheduleStore.isSpecialSchedule && showIndicator"
      class="flex-row md:flex-col"
    >
      SPECIAL SCHEDULE
    </div>
    <div
      v-else-if="scheduleStore.isBreak && showIndicator"
      class="flex-row md:flex-col"
    >
      {{ scheduleStore.daysLeft }} days left
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScheduleStore } from '~/stores/schedule';
import { useStylesStore } from '~/stores/styles';

const now = useNow();
const clock = useDateFormat(now, 'h:mm:ss A');
const date = useDateFormat(now, 'ddd MMMM D YYYY');
const scheduleStore = useScheduleStore();
const stylesStore = useStylesStore();
const { schedule } = storeToRefs(scheduleStore);
const { showClock, showStatus, showDate, showIndicator } =
  storeToRefs(stylesStore);

const statusMessage = computed(() => {
  if (scheduleStore.isBreak) {
    return scheduleStore.breakName;
  }
  if (scheduleStore.isWeekend) {
    return 'Weekend';
  }
  const schoolStartTime = Object.values(schedule)[0].start;
  if (now.value.getTime() < schoolStartTime) {
    return `School starts in ${Math.floor(
      (schoolStartTime - now.value.getTime()) / 1000 / 60,
    )} minutes`;
  }
  for (const timeframe of Object.values(schedule)) {
    if (
      now.value.getTime() >= timeframe.start &&
      now.value.getTime() <= timeframe.end
    ) {
      return `${Math.floor(
        (timeframe.end - now.value.getTime()) / 1000 / 60,
      )} minutes left`;
    }
  }
  return 'School is over';
});
</script>
