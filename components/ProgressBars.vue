<template>
  <div class="my-12 space-y-6 px-1 md:space-y-12 lg:px-12">
    <div v-for="(timeframe, block) of schedule" :key="block">
      <UProgress
        :value="blockProgresses[block]"
        :ui="{
          progress: {
            size: { md: 'h-8' },
            rounded: isProgressRounded
              ? 'rounded-full [&::-webkit-progress-bar]:rounded-full'
              : 'rounded [&::-webkit-progress-bar]:rounded',
            bar: isProgressRounded
              ? '[&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:rounded-full'
              : '[&::-webkit-progress-value]:rounded [&::-moz-progress-bar]:rounded',
            color: `text-${progressColor} dark:text-${progressColor}`,
          },
        }"
      />
      <div
        class="-mt-7 flex h-full flex-row items-center justify-between overflow-x-clip whitespace-nowrap px-4 font-medium tracking-tight text-black dark:text-white"
      >
        <span
          v-if="
            isImmersive &&
            (block.slice(0, 6) === 'REMOVE' || block.slice(0, 6) === 'DELETE')
          "
          >{{ block.slice(6) }}</span
        >
        <span v-else>{{ block }}</span>
        <span>
          {{ useDateFormat(timeframe.start, "h:mm").value }} -
          {{ useDateFormat(timeframe.end, "h:mm").value }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScheduleStore } from "~/stores/schedule";
import { useStylesStore } from "~/stores/styles";
import { useNowStore } from "~/stores/now";

const stylesStore = useStylesStore();
const { progressColor, isProgressRounded } = storeToRefs(stylesStore);

const nowStore = useNowStore();
const { time } = storeToRefs(nowStore);

const scheduleStore = useScheduleStore();
const { schedule, isImmersive } = storeToRefs(scheduleStore);

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
