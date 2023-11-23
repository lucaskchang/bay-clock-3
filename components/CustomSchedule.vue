<template>
  <div>
    <UButton
      :ui="buttonUIs.schedule"
      label="Custom Schedule"
      @click="isOpen = true"
    />
    <UModal
      v-model="isOpen"
      :ui="{
        width: 'sm:max-w-4xl',
      }"
    >
      <div class="w-full">
        <UTabs :items="tabs" orientation="vertical" :ui="tabsStyling">
          <template #item="{ item }">
            <p class="mb-4 text-2xl font-bold">{{ item.label }}</p>
            <ScheduleClasses v-if="item.label === 'Classes'" />
            <ScheduleClubs v-else-if="item.label === 'Clubs'" />
            <ScheduleActivities v-else-if="item.label === 'Activities'" />
            <ScheduleImmersives v-else-if="item.label === 'Immersives'" />
            <ScheduleExtras v-else-if="item.label === 'Extras'" />
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
import tabsStyling from '~/assets/styles/tabs.json';
import { useStylesStore } from '~/stores/styles';

const stylesStore = useStylesStore();
const { buttonUIs } = storeToRefs(stylesStore);

const isOpen = ref(false);
const tabs = [
  { label: 'Classes' },
  { label: 'Clubs' },
  { label: 'Activities' },
  { label: 'Immersives' },
  { label: 'Extras' },
];
</script>
