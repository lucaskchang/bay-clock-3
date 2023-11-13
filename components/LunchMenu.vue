<template>
  <div>
    <UButton
      variant="outline"
      color="black"
      :ui="buttonStyling"
      label="Lunch Menu"
      @click="isOpen = true"
    />
    <UModal
      v-model="isOpen"
      :ui="{
        container: 'm-8 mx-auto w-full md:w-1/2',
        width: 'sm:max-w-full',
        background: 'rounded-lg bg-transparent',
      }"
    >
      <div class="w-full">
        <img src="https://www.bayclock.org/menu/1.jpg" class="rounded-t-lg" />
        <img src="https://www.bayclock.org/menu/2.jpg" class="rounded-b-lg" />
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import buttonStyling from '~/assets/styles/buttons.json';

const isOpen = ref(false);
</script>
