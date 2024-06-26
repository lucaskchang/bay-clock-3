<template>
  <div>
    <p class="mr-2 text-xl font-semibold">Color</p>
    <div class="mt-2 flex flex-wrap gap-4">
      <div
        v-for="(styles, button) of buttonStyles"
        :key="button"
        class="flex flex-col"
      >
        <UPopover>
          <UButton
            icon="i-heroicons-paint-brush"
            :ui="{ variant: { ...buttonUIs[button].variant } }"
            :label="titles[button]"
          />
          <template #panel>
            <div class="flex w-64 flex-wrap p-2">
              <div v-for="color in colors.bg" :key="color">
                <div
                  class="size-6 cursor-pointer"
                  :class="{
                    [color]: true,
                    'border-2 border-white':
                      buttonStyles[button].color === color,
                  }"
                  @click="buttonStyles[button].color = color"
                />
              </div>
            </div>
          </template>
        </UPopover>
      </div>
    </div>
    <p class="mr-2 mt-4 text-xl font-semibold">Rounded</p>
    <div class="mt-2 flex flex-wrap gap-4">
      <div
        v-for="(styles, button) of buttonStyles"
        :key="button"
        class="flex flex-row items-center"
      >
        <p class="mr-2">
          {{ titles[button] }}
        </p>
        <UToggle v-model="buttonStyles[button].isRounded" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStylesStore } from "~/stores/styles";
import colors from "~/assets/styles/colors.json";

const stylesStore = useStylesStore();
const { buttonStyles, buttonUIs } = storeToRefs(stylesStore);

const titles = {
  links: "Useful Links",
  lunch: "Lunch",
  schedule: "Custom Schedule",
  styles: "Customize",
  weekly: "Weekly Schedule",
};
</script>
