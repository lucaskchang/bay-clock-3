<template>
  <div>
    <p class="mr-2 text-xl font-semibold">Color</p>
    <div class="mt-2 flex flex-wrap gap-4">
      <div class="flex flex-col">
        <p class="font-semibold">Useful Links</p>
        <UPopover :open="isLinksOpen">
          <UButton
            icon="i-heroicons-paint-brush"
            variant="solid"
            label="Choose Color"
            :ui="{
              variant: {
                solid: `bg-${linksButtonColor} hover:bg-${linksButtonHoverColor} ${
                  parseInt(linksButtonColor.split('-')[1]) <= 200
                    ? 'text-black'
                    : 'text-white'
                }`,
              },
            }"
            @click="isLinksOpen = !isLinksOpen"
          />
          <template #panel>
            <div class="flex w-64 flex-wrap p-2">
              <div v-for="color in colors.bg" :key="color">
                <div
                  class="h-6 w-6 cursor-pointer"
                  :class="color"
                  @click="linksButtonColor = color.replace('bg-', '')"
                >
                  <div
                    v-if="linksButtonColor === color.replace('bg-', '')"
                    class="h-6 w-6 border-2 border-white"
                  ></div>
                </div>
              </div>
            </div>
          </template>
        </UPopover>
      </div>
      <div class="flex flex-col">
        <p class="font-semibold">Lunch Menu</p>
        <UPopover :open="isLunchOpen">
          <UButton
            icon="i-heroicons-paint-brush"
            variant="solid"
            label="Choose Color"
            :ui="{
              variant: {
                solid: `bg-${lunchButtonColor} hover:bg-${lunchButtonHoverColor} ${
                  parseInt(lunchButtonColor.split('-')[1]) <= 200
                    ? 'text-black'
                    : 'text-white'
                }`,
              },
            }"
            @click="isLunchOpen = !isLunchOpen"
          />
          <template #panel>
            <div class="flex w-64 flex-wrap p-2">
              <div v-for="color in colors.bg" :key="color">
                <div
                  class="h-6 w-6 cursor-pointer"
                  :class="color"
                  @click="lunchButtonColor = color.replace('bg-', '')"
                >
                  <div
                    v-if="lunchButtonColor === color.replace('bg-', '')"
                    class="h-6 w-6 border-2 border-white"
                  ></div>
                </div>
              </div>
            </div>
          </template>
        </UPopover>
      </div>
      <div class="flex flex-col">
        <p class="font-semibold">Custom Schedule</p>
        <UPopover :open="isScheduleOpen">
          <UButton
            icon="i-heroicons-paint-brush"
            variant="solid"
            label="Choose Color"
            :ui="{
              variant: {
                solid: `bg-${scheduleButtonColor} hover:bg-${scheduleButtonHoverColor} ${
                  parseInt(scheduleButtonColor.split('-')[1]) <= 200
                    ? 'text-black'
                    : 'text-white'
                }`,
              },
            }"
            @click="isScheduleOpen = !isScheduleOpen"
          />
          <template #panel>
            <div class="flex w-64 flex-wrap p-2">
              <div v-for="color in colors.bg" :key="color">
                <div
                  class="h-6 w-6 cursor-pointer"
                  :class="color"
                  @click="scheduleButtonColor = color.replace('bg-', '')"
                >
                  <div
                    v-if="scheduleButtonColor === color.replace('bg-', '')"
                    class="h-6 w-6 border-2 border-white"
                  ></div>
                </div>
              </div>
            </div>
          </template>
        </UPopover>
      </div>
      <div class="flex flex-col">
        <p class="font-semibold">Customize</p>
        <UPopover :open="isStylesOpen">
          <UButton
            icon="i-heroicons-paint-brush"
            variant="solid"
            label="Choose Color"
            :ui="{
              variant: {
                solid: `bg-${stylesButtonColor} hover:bg-${stylesButtonHoverColor} ${
                  parseInt(stylesButtonColor.split('-')[1]) <= 200
                    ? 'text-black'
                    : 'text-white'
                }`,
              },
            }"
            @click="isStylesOpen = !isStylesOpen"
          />
          <template #panel>
            <div class="flex w-64 flex-wrap p-2">
              <div v-for="color in colors.bg" :key="color">
                <div
                  class="h-6 w-6 cursor-pointer"
                  :class="color"
                  @click="stylesButtonColor = color.replace('bg-', '')"
                >
                  <div
                    v-if="stylesButtonColor === color.replace('bg-', '')"
                    class="h-6 w-6 border-2 border-white"
                  ></div>
                </div>
              </div>
            </div>
          </template>
        </UPopover>
      </div>
      <div class="flex flex-col">
        <p class="font-semibold">Weekly Schedule</p>
        <UPopover :open="isWeeklyOpen">
          <UButton
            icon="i-heroicons-paint-brush"
            variant="solid"
            label="Choose Color"
            :ui="{
              variant: {
                solid: `bg-${weeklyButtonColor} hover:bg-${weeklyButtonHoverColor} ${
                  parseInt(weeklyButtonColor.split('-')[1]) <= 200
                    ? 'text-black'
                    : 'text-white'
                }`,
              },
            }"
            @click="isWeeklyOpen = !isWeeklyOpen"
          />
          <template #panel>
            <div class="flex w-64 flex-wrap p-2">
              <div v-for="color in colors.bg" :key="color">
                <div
                  class="h-6 w-6 cursor-pointer"
                  :class="color"
                  @click="weeklyButtonColor = color.replace('bg-', '')"
                >
                  <div
                    v-if="weeklyButtonColor === color.replace('bg-', '')"
                    class="h-6 w-6 border-2 border-white"
                  ></div>
                </div>
              </div>
            </div>
          </template>
        </UPopover>
      </div>
    </div>
    <p class="mr-2 mt-4 text-xl font-semibold">Rounded</p>
    <div class="mt-2 flex flex-wrap gap-4">
      <div class="flex flex-row items-center">
        <p class="mr-2">Useful Links</p>
        <UToggle v-model="isLinksRounded" />
      </div>
      <div class="flex flex-row items-center">
        <p class="mr-2">Lunch Menu</p>
        <UToggle v-model="isLunchRounded" />
      </div>
      <div class="flex flex-row items-center">
        <p class="mr-2">Custom Schedule</p>
        <UToggle v-model="isScheduleRounded" />
      </div>
      <div class="flex flex-row items-center">
        <p class="mr-2">Customize</p>
        <UToggle v-model="isStylesRounded" />
      </div>
      <div class="flex flex-row items-center">
        <p class="mr-2">Weekly Schedule</p>
        <UToggle v-model="isWeeklyRounded" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStylesStore } from '@/stores/styles';
import colors from '~/assets/styles/colors.json';

const stylesStore = useStylesStore();
const {
  linksButtonColor,
  linksButtonHoverColor,
  lunchButtonColor,
  lunchButtonHoverColor,
  scheduleButtonColor,
  scheduleButtonHoverColor,
  stylesButtonColor,
  stylesButtonHoverColor,
  weeklyButtonColor,
  weeklyButtonHoverColor,
  isLinksRounded,
  isLunchRounded,
  isScheduleRounded,
  isStylesRounded,
  isWeeklyRounded,
} = storeToRefs(stylesStore);

const isLinksOpen = ref(false);
const isLunchOpen = ref(false);
const isScheduleOpen = ref(false);
const isStylesOpen = ref(false);
const isWeeklyOpen = ref(false);
</script>
