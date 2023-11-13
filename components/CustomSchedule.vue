<template>
  <div>
    <UButton
      variant="outline"
      :ui="buttonStyling"
      color="black"
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
            <div v-if="item.label === 'Classes'" class="space-y-4">
              <UInput
                v-for="name in Object.keys(blockNames).splice(0, 6)"
                :key="name"
                v-model="blockNames[name]"
                :placeholder="name"
              />
              <UDivider />
              <UInput
                v-for="name in Object.keys(blockNames).splice(6, 9)"
                :key="name"
                v-model="blockNames[name]"
                :placeholder="name"
              />
            </div>
            <div v-else-if="item.label === 'Clubs'" class="space-y-4">
              <div class="flex flex-col space-y-4">
                <div
                  v-for="day in Object.keys(clubs)"
                  :key="day"
                  class="flex flex-row items-center gap-4"
                >
                  <p class="font-semibold">{{ day }}</p>
                  <UInput
                    v-model="clubs[day]"
                    placeholder="Enter a club name"
                    class="w-full"
                  />
                </div>
              </div>
            </div>
            <div v-else-if="item.label === 'Activities'" class="space-y-4">
              <UInput
                v-model="activityName"
                placeholder="Activities + Sports/Drama"
                class="w-full"
              />
              <div class="flex flex-col space-y-4">
                <div
                  v-for="day in Object.keys(activityDays)"
                  :key="day"
                  class="flex flex-row items-center gap-4"
                  :class="{ 'text-gray-400': !activityDays[day] }"
                >
                  <UCheckbox v-model="activityDays[day]" />
                  <p class="font-semibold">
                    {{ day }}
                  </p>
                  <UInput
                    v-model="activitySchedule[day].start"
                    placeholder="Enter a club name"
                    type="time"
                    class="w-full"
                    :disabled="!activityDays[day]"
                  />
                  <p>-</p>
                  <UInput
                    v-model="activitySchedule[day].end"
                    placeholder="Enter a club name"
                    type="time"
                    class="w-full"
                    :disabled="!activityDays[day]"
                  />
                </div>
              </div>
            </div>
            <div v-else-if="item.label === 'Immersives'" class="space-y-4">
              <UInput
                v-model="immersiveName"
                placeholder="Immersive"
                class="w-full"
              />
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
import { useCustomScheduleStore } from '@/stores/customSchedule';

const customScheduleStore = useCustomScheduleStore();
const {
  blockNames,
  clubs,
  activityDays,
  activitySchedule,
  activityName,
  immersiveName,
} = storeToRefs(customScheduleStore);

const isOpen = ref(false);
const items = [
  { label: 'Classes' },
  { label: 'Clubs' },
  { label: 'Activities' },
  { label: 'Immersives' },
  { label: 'Extras' },
];
</script>
