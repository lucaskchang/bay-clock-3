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
      <NuxtImg
        src="/menu/menu.jpg"
        class="rounded-t-lg"
      />
      <a
        class="rounded-b-lg bg-white p-4"
        href="https://presidio.gov/explore/park-attractions/presidio-pop-up-schedule"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p class="text-center text-2xl text-blue-400 hover:text-blue-500">
          Food Truck Schedule
        </p>
      </a>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useStylesStore } from '~/stores/styles';

const stylesStore = useStylesStore();
const { buttonUIs } = storeToRefs(stylesStore);

const isOpen = ref(false);
</script>
