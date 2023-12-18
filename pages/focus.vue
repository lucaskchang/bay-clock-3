<template>
  <div class="flex h-screen flex-col items-center justify-center text-center">
    <p class="text-8xl font-bold">
      {{ Math.floor((perimeter / windowPerimeter) * 10000) / 100
      }}<span class="text-4xl">%</span>
    </p>
    <div
      class="fixed left-0 top-0 h-8 w-full rounded-r"
      :class="'bg-' + progressColor"
      :style="{ width: `${topPercentage * width}px` }"
    />
    <div
      class="fixed right-0 top-0 h-full w-8 rounded-b"
      :class="'bg-' + progressColor"
      :style="{ height: `${rightPercentage * height}px` }"
    />
    <div
      class="fixed bottom-0 right-0 h-8 w-full rounded-l"
      :class="'bg-' + progressColor"
      :style="{ width: `${bottomPercentage * width}px` }"
    />
    <div
      class="fixed bottom-0 left-0 h-full w-8 rounded-t"
      :class="'bg-' + progressColor"
      :style="{ height: `${leftPercentage * height}px` }"
    />
  </div>
</template>

<script setup lang="ts">
import { useScheduleStore } from '~/stores/schedule';
import { useNowStore } from '~/stores/now';
import { useStylesStore } from '~/stores/styles';

const stylesStore = useStylesStore();
const { progressColor } = storeToRefs(stylesStore);
const nowStore = useNowStore();
const { time } = storeToRefs(nowStore);
const scheduleStore = useScheduleStore();
const { schedule } = storeToRefs(scheduleStore);

const { width, height } = useWindowSize();
const windowPerimeter = computed(() => width.value * 2 + height.value * 2);

const perimeter = computed(() => {
  const timeNum = time.value.getTime();
  for (const timeframe of Object.values(schedule.value)) {
    if (timeNum >= timeframe.start && timeNum <= timeframe.end) {
      const percentDone =
        (timeNum - timeframe.start) / (timeframe.end - timeframe.start);
      const perimeterDone = Math.floor(percentDone * windowPerimeter.value);
      return perimeterDone;
    }
  }
  return 0;
});
const topPercentage = computed(() => {
  if (perimeter.value >= width.value) {
    return 1;
  } else {
    return Math.floor((perimeter.value / width.value) * 100) / 100;
  }
});
const rightPercentage = computed(() => {
  const perimLeft = perimeter.value - width.value;
  if (perimLeft <= 0) {
    return 0;
  } else if (perimLeft >= height.value) {
    return 1;
  } else {
    return Math.floor((perimLeft / height.value) * 100) / 100;
  }
});
const bottomPercentage = computed(() => {
  const perimLeft = perimeter.value - width.value - height.value;
  if (perimLeft <= 0) {
    return 0;
  } else if (perimLeft >= width.value) {
    return 1;
  } else {
    return Math.floor((perimLeft / width.value) * 100) / 100;
  }
});
const leftPercentage = computed(() => {
  const perimLeft = perimeter.value - width.value - height.value - width.value;
  if (perimLeft <= 0) {
    return 0;
  } else if (perimLeft >= height.value) {
    return 1;
  } else {
    return Math.floor((perimLeft / height.value) * 100) / 100;
  }
});
</script>
