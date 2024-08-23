<template>
  <div>
    <UButton
      :ui="buttonUIs.lunch"
      label="Lunch Menu"
      @click="isOpen = true"
    />
    <UModal
      v-model="isOpen"
      :ui="{
        container: 'm-8 mx-auto w-full md:w-1/2 items-center',
        width: 'sm:max-w-full',
        background: 'rounded-lg bg-transparent',
      }"
    >
      <div class="w-full">
        <NuxtImg
          v-for="image in menuImages"
          :key="image"
          provider="contentful"
          format="webp"
          :src="image"
          class="rounded-lg"
        />
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useStylesStore } from '~/stores/styles';
import { useContentfulStore } from '~/stores/contentful';

const stylesStore = useStylesStore();
const contentfulStore = useContentfulStore();
const { buttonUIs } = storeToRefs(stylesStore);
const { menuImages } = storeToRefs(contentfulStore);

const isOpen = ref(false);
</script>
