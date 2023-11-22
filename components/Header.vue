<template>
  <div
    class="flex flex-col justify-between text-6xl font-bold md:flex-row md:px-2 md:pt-2 md:text-7xl"
  >
    <div v-if="showClock" class="flex flex-row tracking-tighter md:flex-col">
      {{ clock }}
    </div>
    <div v-if="showStatus" class="flex flex-row tracking-tight md:flex-col">
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
import { useNowStore } from '~/stores/now';

const nowStore = useNowStore();
const { time } = storeToRefs(nowStore);
const { updateTimeLoop } = nowStore;

onMounted(() => {
  updateTimeLoop();
});

const clock = useDateFormat(time, 'h:mm:ss A');
const date = useDateFormat(time, 'ddd MMMM D YYYY');
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
  const schoolStartTime = Object.values(schedule.value)[0].start;
  const schoolEndTime = Object.values(schedule.value)[
    Object.values(schedule.value).length - 1
  ].end;
  if (time.value.getTime() < schoolStartTime) {
    return `School starts in ${Math.floor(
      (schoolStartTime - time.value.getTime()) / 1000 / 60,
    )} minutes`;
  }
  if (time.value.getTime() > schoolEndTime) {
    return 'School is over';
  }
  for (const timeframe of Object.values(schedule.value)) {
    if (
      time.value.getTime() >= timeframe.start &&
      time.value.getTime() <= timeframe.end
    ) {
      return `${Math.floor(
        (timeframe.end - time.value.getTime()) / 1000 / 60,
      )} minutes left`;
    }
  }
  return 'Passing';
});

useHead({
  titleTemplate: statusMessage,
});
</script>
