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
          :items="tabs"
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
              <p class="text-xl font-semibold">Classes</p>
              <UInput
                v-for="name in Object.keys(blockNames).splice(0, 6)"
                :key="name"
                v-model="blockNames[name]"
                :placeholder="name"
              />
              <UDivider />
              <p class="text-xl font-semibold">Other</p>
              <UInput
                v-for="name in Object.keys(blockNames).splice(6, 9)"
                :key="name"
                v-model="blockNames[name]"
                :placeholder="name"
              />
            </div>
            <div v-else-if="item.label === 'Clubs'">
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
              <p class="text-xl font-semibold">Name</p>
              <UInput
                v-model="activityName"
                placeholder="Activities + Sports/Drama"
                class="w-full"
              />
              <p class="text-xl font-semibold">Schedule</p>
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
            <div v-else-if="item.label === 'Immersives'">
              <p class="mb-2 text-xl font-semibold">Immersive Name</p>
              <UInput
                v-model="immersiveName"
                placeholder="Immersive"
                class="w-full"
              />
            </div>
            <div v-else-if="item.label === 'Extras'">
              <p class="mb-2 text-xl font-semibold">Flex Class</p>
              <div class="flex flex-row space-x-4">
                <div class="flex flex-col">
                  <URadioGroup
                    v-model="grade"
                    legend="Choose your grade"
                    :options="grades"
                  />
                </div>
                <div v-if="grade != '0'" class="flex flex-col">
                  <URadioGroup
                    v-model="hasSpecialFlex"
                    :legend="'Do you have ' + specialFlexName + '?'"
                    :options="[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                    ]"
                  />
                </div>
                <div v-if="hasSpecialFlex === 'Yes'" class="flex flex-col">
                  <URadioGroup
                    v-model="flexBlock"
                    legend="Flex Block"
                    :options="blocks"
                  />
                </div>
                <div
                  v-if="flexBlock && hasSpecialFlex === 'Yes'"
                  class="flex flex-col"
                >
                  <URadioGroup
                    v-model="specialFlexDay"
                    legend="Day of week"
                    :options="days"
                  />
                </div>
              </div>
              <p class="my-2 text-xl font-semibold">Advisory</p>
              <URadioGroup
                v-model="advisoryDay"
                legend="Day of week"
                :options="[
                  { value: 'Tuesday', label: 'Tuesday' },
                  { value: 'Thursday', label: 'Thursday' },
                ]"
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
  grade,
  hasSpecialFlex,
  flexBlock,
  specialFlexDay,
  specialFlexName,
  advisoryDay,
} = storeToRefs(customScheduleStore);

const isOpen = ref(false);
const tabs = [
  { label: 'Classes' },
  { label: 'Clubs' },
  { label: 'Activities' },
  { label: 'Immersives' },
  { label: 'Extras' },
];
const grades = [
  { value: '9', label: '9th' },
  { value: '10', label: '10th' },
  { value: '11', label: '11th' },
  { value: '12', label: '12th' },
];
// const days = [
//   { value: 'Monday', label: 'Monday' },
//   { value: 'Tuesday', label: 'Tuesday' },
//   { value: 'Wednesday', label: 'Wednesday' },
//   { value: 'Thursday', label: 'Thursday' },
//   { value: 'Friday', label: 'Friday' },
//   { value: 'Saturday', label: 'Saturday' },
//   { value: 'Sunday', label: 'Sunday' },
// ];

const days = computed(() => {
  if (flexBlock.value === 'A') {
    return [
      { value: 'Monday', label: 'Monday' },
      { value: 'Tuesday', label: 'Tuesday' },
      { value: 'Thursday', label: 'Thursday' },
    ];
  } else if (flexBlock.value === 'B') {
    return [
      { value: 'Monday', label: 'Monday' },
      { value: 'Tuesday', label: 'Tuesday' },
      { value: 'Thursday', label: 'Thursday' },
    ];
  } else if (flexBlock.value === 'C') {
    return [
      { value: 'Monday', label: 'Monday' },
      { value: 'Wednesday', label: 'Wednesday' },
      { value: 'Thursday', label: 'Thursday' },
    ];
  } else if (flexBlock.value === 'D') {
    return [
      { value: 'Monday', label: 'Monday' },
      { value: 'Wednesday', label: 'Wednesday' },
      { value: 'Friday', label: 'Friday' },
    ];
  } else if (flexBlock.value === 'E') {
    return [
      { value: 'Tuesday', label: 'Tuesday' },
      { value: 'Wednesday', label: 'Wednesday' },
      { value: 'Friday', label: 'Friday' },
    ];
  } else if (flexBlock.value === 'F') {
    return [
      { value: 'Tuesday', label: 'Tuesday' },
      { value: 'Wednesday', label: 'Wednesday' },
      { value: 'Friday', label: 'Friday' },
    ];
  }
});

const blocks = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
];
</script>
