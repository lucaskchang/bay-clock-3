<template>
  <div class="my-12 space-y-6 px-1 md:space-y-10 lg:px-12">
    <div v-for="(timeframe, block) of schedule" :key="block">
      <UProgress
        :value="blockProgresses[block]"
        :ui="{
          progress: {
            size: { md: 'h-6 md:h-8' },
            rounded: 'rounded-full [&::-webkit-progress-bar]:rounded-full',
            bar: '[&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:rounded-full',
          },
        }"
      />
      <div
        class="-mt-[24px] flex h-full flex-row items-center justify-between overflow-x-clip whitespace-nowrap px-4 font-medium tracking-tight text-black dark:text-white md:-mt-[28px]"
      >
        <span>{{ block }}</span>
        <span>
          {{ useDateFormat(timeframe.start, 'h:mm').value }} -
          {{ useDateFormat(timeframe.end, 'h:mm').value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScheduleStore } from '@/stores/schedule';
import { useNowStore } from '~/stores/now';

const nowStore = useNowStore();
const { time } = storeToRefs(nowStore);

const scheduleStore = useScheduleStore();
const { schedule } = storeToRefs(scheduleStore);

const blockProgresses = computed(() => {
  const progresses: Record<string, number> = {};
  for (const [blockName, timeframe] of Object.entries(schedule.value)) {
    if (
      time.value.getTime() >= timeframe.start &&
      time.value.getTime() <= timeframe.end
    ) {
      progresses[blockName] =
        ((time.value.getTime() - timeframe.start) /
          (timeframe.end - timeframe.start)) *
        100;
    } else if (time.value.getTime() < timeframe.start) {
      progresses[blockName] = 0;
    } else {
      progresses[blockName] = 100;
    }
  }
  return progresses;
});
</script>
