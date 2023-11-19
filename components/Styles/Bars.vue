<template>
  <div>
    <p class="mr-2 text-xl font-semibold">Color</p>
    <UPopover :open="isOpen">
      <UButton color="white" label="Choose Color" @click="isOpen = !isOpen" />

      <template #panel>
        <div class="flex w-72 flex-wrap p-3">
          <div v-for="color in colors.bg" :key="color">
            <div
              class="h-6 w-6 cursor-pointer"
              :class="color"
              @click="progressColor = color.replace('bg-', '')"
            >
              <div
                v-if="progressColor === color.replace('bg-', '')"
                class="h-6 w-6 border-2 border-white"
              ></div>
            </div>
          </div>
        </div>
      </template>
    </UPopover>
    <p class="mr-2 mt-4 text-xl font-semibold">Other</p>
    <div class="flex flex-row items-center">
      <p class="mr-2">Rounded</p>
      <UToggle v-model="isProgressRounded" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStylesStore } from '@/stores/styles';
import colors from '~/assets/styles/colors.json';

const stylesStore = useStylesStore();
const { progressColor, isProgressRounded } = storeToRefs(stylesStore);

const isOpen = ref(false);
</script>
