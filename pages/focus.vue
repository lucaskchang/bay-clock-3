<template>
  <ClientOnly>
    <div class="flex h-screen flex-col items-center justify-center text-center">
      <p class="text-8xl font-bold tabular-nums">
        {{ timeLeftDisplay }}<span
          v-if="currentBlock"
          class="text-4xl"
        />
      </p>
      <p class="mt-4 text-3xl font-semibold text-gray-600 dark:text-gray-400">
        {{ statusLabel }}
      </p>
      <Transition name="fade">
        <UButton
          v-if="showControls"
          :ui="buttonUIs.links"
          to="/"
          label="Home"
          size="lg"
          class="mt-8"
        />
      </Transition>
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
    <template #fallback>
      <div class="h-screen" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useScheduleStore } from '~/stores/schedule';
import { useNowStore } from '~/stores/now';
import { useStylesStore } from '~/stores/styles';

useSeoMeta({
  title: 'Focus Mode - Bay Clock',
  description: 'A distraction-free, full-screen view of how much class time remains for students at The Bay School of San Francisco.',
  ogTitle: 'Focus Mode - Bay Clock',
  ogDescription: 'A distraction-free, full-screen view of how much class time remains for students at The Bay School of San Francisco.',
  ogUrl: 'https://bayclock.org/focus',
  twitterTitle: 'Focus Mode - Bay Clock',
  twitterDescription: 'A distraction-free, full-screen view of how much class time remains for students at The Bay School of San Francisco.',
});

const stylesStore = useStylesStore();
const { progressColor, buttonUIs } = storeToRefs(stylesStore);
const nowStore = useNowStore();
const { time } = storeToRefs(nowStore);
const scheduleStore = useScheduleStore();
const { schedule, isImmersive, isBreak, breakName, isWeekend } = storeToRefs(scheduleStore);

const { width, height } = useWindowSize();
const windowPerimeter = computed(() => width.value * 2 + height.value * 2);

const currentBlock = computed(() => {
  const timeNum = time.value.getTime();
  for (const [name, timeframe] of Object.entries(schedule.value)) {
    if (timeNum >= timeframe.start && timeNum <= timeframe.end) {
      return { name, timeframe };
    }
  }
  return null;
});

const blockLabel = computed(() => {
  if (!currentBlock.value) return '';
  const name = currentBlock.value.name;
  if (isImmersive.value && (name.slice(0, 6) === 'REMOVE' || name.slice(0, 6) === 'DELETE')) {
    return name.slice(6);
  }
  return name;
});

const statusLabel = computed(() => {
  if (isBreak.value) return breakName.value;
  if (isWeekend.value) return 'Weekend';
  if (currentBlock.value) return blockLabel.value;
  return 'Passing';
});

const timeLeftDisplay = computed(() => {
  if (!currentBlock.value) return '--:--';
  const totalSeconds = Math.max(
    0,
    Math.floor((currentBlock.value.timeframe.end - time.value.getTime()) / 1000),
  );
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const paddedSeconds = seconds.toString().padStart(2, '0');
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${paddedSeconds}`;
  }
  return `${minutes}:${paddedSeconds}`;
});

const showControls = ref(false);
let hideControlsTimeout: ReturnType<typeof setTimeout> | null = null;

function revealControls() {
  showControls.value = true;
  if (hideControlsTimeout) clearTimeout(hideControlsTimeout);
  hideControlsTimeout = setTimeout(() => {
    showControls.value = false;
  }, 2000);
}

useEventListener('mousemove', revealControls);

onUnmounted(() => {
  if (hideControlsTimeout) clearTimeout(hideControlsTimeout);
});

const timeframeProgress = computed(() => {
  if (!currentBlock.value) return 0;
  const { start, end } = currentBlock.value.timeframe;
  return (time.value.getTime() - start) / (end - start);
});
const perimeter = computed(() => Math.floor(timeframeProgress.value * windowPerimeter.value));
const topPercentage = computed(() => {
  if (perimeter.value >= width.value) {
    return 1;
  }
  else {
    return Math.floor((perimeter.value / width.value) * 100) / 100;
  }
});
const rightPercentage = computed(() => {
  const perimLeft = perimeter.value - width.value;
  if (perimLeft <= 0) {
    return 0;
  }
  else if (perimLeft >= height.value) {
    return 1;
  }
  else {
    return Math.floor((perimLeft / height.value) * 100) / 100;
  }
});
const bottomPercentage = computed(() => {
  const perimLeft = perimeter.value - width.value - height.value;
  if (perimLeft <= 0) {
    return 0;
  }
  else if (perimLeft >= width.value) {
    return 1;
  }
  else {
    return Math.floor((perimLeft / width.value) * 100) / 100;
  }
});
const leftPercentage = computed(() => {
  const perimLeft = perimeter.value - width.value - height.value - width.value;
  if (perimLeft <= 0) {
    return 0;
  }
  else if (perimLeft >= height.value) {
    return 1;
  }
  else {
    return Math.floor((perimLeft / height.value) * 100) / 100;
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
