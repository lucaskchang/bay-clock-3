<template>
  <div>
    <p class="mr-2 text-xl font-semibold">Color</p>
    <UPopover :open="isOpen">
      <UButton
        icon="i-heroicons-paint-brush"
        variant="solid"
        label="Choose Color"
        :ui="{
          variant: {
            solid: `bg-${progressColor} hover:bg-${progressHoverColor} dark:bg-${progressColor} dark:hover:bg-${progressHoverColor} ${
              parseInt(progressColor.split('-')[1]) >= 400
                ? 'text-white dark:text-white'
                : 'text-black dark:text-black'
            }`,
          },
        }"
        @click="isOpen = !isOpen"
      />
      <template #panel>
        <div class="flex w-64 flex-wrap p-2">
          <div v-for="color in colors.bg" :key="color">
            <div
              class="size-6 cursor-pointer"
              :class="{
                [color]: true,
                'border-2 border-white':
                  progressColor === color.replace('bg-', ''),
              }"
              @click="progressColor = color.replace('bg-', '')"
            />
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
import { useStylesStore } from "~/stores/styles";
import colors from "~/assets/styles/colors.json";

const stylesStore = useStylesStore();
const { progressColor, progressHoverColor, isProgressRounded } =
  storeToRefs(stylesStore);

const isOpen = ref(false);
</script>
