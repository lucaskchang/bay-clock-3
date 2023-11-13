<template>
  <div>
    <UButton
      variant="outline"
      :ui="buttonStyling"
      color="black"
      label="Weekly Schedule"
      @click="isOpen = true"
    />
    <UModal
      v-model="isOpen"
      :ui="{
        width: 'sm:max-w-7xl',
      }"
    >
      <div class="flex min-h-[384px] w-full flex-row gap-4 p-8">
        <div v-for="n in 5" :key="n" class="flex w-1/5 flex-col gap-4">
          <p class="text-center text-2xl font-semibold">Monday</p>
          <div
            v-for="i in 7"
            :key="i"
            class="h-48 w-full rounded-lg bg-blue-300 pl-2 pt-1"
          >
            <p class="text-2xl font-semibold">Block {{ i }}</p>
            <p class="text-xl font-semibold">8:00 - 9:00</p>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import buttonStyling from '~/assets/styles/buttons.json';

const isOpen = ref(false);
</script>
