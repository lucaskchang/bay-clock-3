<template>
  <div>
    <UButton
      variant="outline"
      :ui="buttonStyling"
      color="black"
      label="Customize"
      @click="isOpen = true"
    />
    <UModal
      v-model="isOpen"
      :ui="{
        width: 'sm:max-w-4xl',
      }"
    >
      <div class="w-full">
        <UTabs
          :items="items"
          orientation="vertical"
          :ui="{
            base: 'h-full',
            wrapper: 'flex gap-4',
            container: 'pt-2 pb-4 pr-4',
            list: {
              width: 'w-48',
              rounded: 'rounded-none rounded-l-lg',
              tab: { base: 'justify-start', size: 'text-md', height: 'h-12' },
            },
          }"
        >
          <template #item="{ item }">
            <p class="mb-4 text-2xl font-bold">{{ item.label }}</p>
            <div v-if="item.label === 'Header'">
              <p class="mr-2 text-xl font-semibold">Toggle Elements</p>
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
            <div
              class="flex flex-row justify-between gap-2 justify-self-end pt-4"
            >
              <div>
                <UButton size="lg" label="Save" @click="isOpen = false" />
                <UButton size="lg" variant="ghost" label="Reset" />
              </div>
              <div>
                <UButton
                  size="lg"
                  color="red"
                  label="Cancel"
                  @click="isOpen = false"
                />
              </div>
            </div>
          </template>
        </UTabs>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import buttonStyling from '~/assets/styles/buttons.json';
import { useStylesStore } from '~/stores/styles';

const stylesStore = useStylesStore();
const { showClock, showStatus, showDate, showIndicator } =
  storeToRefs(stylesStore);

const isOpen = ref(false);
const items = [
  { label: 'Header' },
  { label: 'Bars' },
  { label: 'Buttons' },
  { label: 'Other' },
];
</script>
