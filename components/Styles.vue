<template>
  <div>
    <UButton
      :ui="{
        ...buttonStyling,
        rounded: `rounded${isStylesRounded ? '-full' : ''}`,
        variant: {
          solid: `bg-${stylesButtonColor} hover:bg-${stylesButtonHoverColor} ${
            parseInt(stylesButtonColor.split('-')[1]) <= 200
              ? 'text-black'
              : 'text-white'
          }`,
        },
      }"
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
        <UTabs :items="items" orientation="vertical" :ui="tabsStyling">
          <template #item="{ item }">
            <p class="mb-4 text-2xl font-bold">{{ item.label }}</p>
            <StylesHeader v-if="item.label === 'Header'" />
            <StylesBars v-if="item.label === 'Bars'" />
            <StylesButtons v-if="item.label === 'Buttons'" />
            <StylesOther v-if="item.label === 'Other'" />
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
import tabsStyling from '~/assets/styles/tabs.json';
import { useStylesStore } from '~/stores/styles';

const stylesStore = useStylesStore();
const { stylesButtonColor, stylesButtonHoverColor, isStylesRounded } =
  storeToRefs(stylesStore);

const isOpen = ref(false);
const items = [
  { label: 'Header' },
  { label: 'Bars' },
  { label: 'Buttons' },
  { label: 'Presets' },
  { label: 'Other' },
];
</script>
