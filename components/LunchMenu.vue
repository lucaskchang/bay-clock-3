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
      <div class="w-full p-4 text-center">
        <p>
          No Lunch Menu Available :(
        </p>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useStylesStore } from '~/stores/styles';

const stylesStore = useStylesStore();
const { buttonUIs } = storeToRefs(stylesStore);

const isOpen = ref(false);
</script>
