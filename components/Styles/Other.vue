<template>
  <div>
    <p class="text-xl font-semibold">
      Info
    </p>
    <div class="flex flex-row items-center space-x-2">
      <p>
        Detailed Time Left
      </p>
      <UToggle v-model="useDetailedTime" />
      <p>
        Show Graduation Countdown
      </p>
      <UToggle v-model="showGraduationCountdown" />
    </div>
    <p class="text-xl font-semibold">
      Theme
    </p>
    <div class="flex flex-row items-center">
      <p class="mr-2">
        Dark Mode
      </p>
      <UToggle v-model="isDarkMode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStylesStore } from '~/stores/styles';

const colorMode = useColorMode();

const stylesStore = useStylesStore();
const { useDetailedTime, showGraduationCountdown, isDarkMode } = storeToRefs(stylesStore);

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});

watch(isDarkMode, () => {
  isDark.value = isDarkMode.value;
});
</script>
