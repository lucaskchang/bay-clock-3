<template>
  <div>
    <p class="text-xl font-semibold">Toggle Elements</p>
    <div class="mt-2 flex gap-4">
      <div class="flex flex-row items-center">
        <p class="mr-2">Clock</p>
        <UToggle v-model="showClock" />
      </div>
      <div class="flex flex-row items-center">
        <p class="mr-2">Time Left</p>
        <UToggle v-model="showStatus" />
      </div>
      <div class="flex flex-row items-center">
        <p class="mr-2">Date</p>
        <UToggle v-model="showDate" />
      </div>
      <div class="flex flex-row items-center">
        <p class="mr-2">Special Schedule Indicator</p>
        <UToggle v-model="showIndicator" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStylesStore } from '~/stores/styles';

const stylesStore = useStylesStore();
const { showClock, showStatus, showDate, showIndicator } =
  storeToRefs(stylesStore);
</script>
