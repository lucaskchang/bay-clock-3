<template>
  <div
    class="flex flex-col justify-between text-5xl font-semibold md:flex-row md:px-2 md:pt-2 md:text-6xl"
  >
    <div
      v-if="showClock"
      class="flex flex-row tracking-tight md:flex-col"
    >
      {{ clock }}
    </div>
    <div
      v-if="showStatus"
      class="flex flex-row md:flex-col"
    >
      {{ statusMessage }}
    </div>
  </div>
  <div
    class="flex flex-col justify-between text-3xl font-semibold tracking-tight text-gray-600 md:flex-row md:px-2 md:text-4xl dark:text-gray-400"
  >
    <div
      v-if="showDate"
      class="flex-row md:flex-col"
    >
      {{ date }}
    </div>
    <div
      v-if="isSpecialSchedule && showIndicator"
      class="flex-row md:flex-col"
    >
      SPECIAL SCHEDULE
    </div>
    <div
      v-else-if="isBreak && showIndicator"
      class="flex-row md:flex-col"
    >
      {{ daysLeft }} days left
    </div>
    <div
      v-else-if="isImmersive && showIndicator"
      class="flex-row md:flex-col"
    >
      IMMERSIVE
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
const { schedule, isSpecialSchedule, isBreak, daysLeft, isImmersive } = storeToRefs(scheduleStore);
const { showClock, showStatus, showDate, showIndicator, useDetailedTime }
  = storeToRefs(stylesStore);

const statusMessage = computed(() => {
  const timeNum = time.value.getTime();
  if (scheduleStore.isBreak) {
    return scheduleStore.breakName;
  }
  if (scheduleStore.isWeekend) {
    return 'Weekend';
  }
  // If schedule is empty, show loading message -- this is a temporary fix because breaks take a bit to load for some reason?
  if (Object.keys(schedule.value).length === 0) {
    return 'Loading...';
  }
  const schoolStartTime = Object.values(schedule.value)[0].start;
  const schoolEndTime = Object.values(schedule.value).reduce(
    (acc, curr) => Math.max(acc, curr.end),
    0,
  );
  if (timeNum < schoolStartTime) {
    return `School starts in ${Math.floor(
      (schoolStartTime - timeNum) / 1000 / 60,
    )} minutes`;
  }
  if (timeNum > schoolEndTime) {
    return 'School is over';
  }
  for (const timeframe of Object.values(schedule.value)) {
    if (timeNum >= timeframe.start && timeNum <= timeframe.end) {
      if (useDetailedTime.value) {
        const timeLeft = timeframe.end - timeNum;
        const hours
          = Math.floor(timeLeft / 1000 / 60 / 60) > 0
            ? `${Math.floor(timeLeft / 1000 / 60 / 60)}:`
            : '';
        const minutes = hours
          ? Math.floor((timeLeft / 1000 / 60) % 60)
            .toString()
            .padStart(2, '0')
          : Math.floor((timeLeft / 1000 / 60) % 60).toString();
        const seconds = Math.floor((timeLeft / 1000) % 60)
          .toString()
          .padStart(2, '0');

        return `${hours}${minutes}:${seconds} left`;
      }
      else {
        return `${Math.ceil(
          (timeframe.end - timeNum) / 1000 / 60,
        )} minutes left`;
      }
    }
  }
  return 'Passing';
});

useHead({
  titleTemplate: statusMessage,
});
</script>
