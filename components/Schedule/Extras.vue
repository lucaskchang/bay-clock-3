<template>
  <div>
    <p class="mb-2 text-xl font-semibold">Flex Class</p>
    <div class="flex flex-row space-x-4">
      <div class="flex flex-col">
        <URadioGroup v-model="grade" legend="Grade" :options="grades" />
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
      <div v-if="flexBlock && hasSpecialFlex === 'Yes'" class="flex flex-col">
        <URadioGroup
          v-model="specialFlexDay"
          legend="Day of week"
          :options="days"
        />
      </div>
    </div>
    <p class="my-2 text-xl font-semibold">Advisory</p>
    <div class="flex flex-row space-x-4">
      <div class="flex flex-col">
        <URadioGroup
          v-model="advisoryDay"
          legend="Group Advisory Day"
          :options="[
            { value: 'Tuesday', label: 'Tuesday' },
            { value: 'Thursday', label: 'Thursday' },
          ]"
        />
      </div>
      <div class="flex flex-col">
        <URadioGroup
          v-if="advisoryDay"
          v-model="showOneOnOnes"
          legend="Show One-on-Ones"
          :options="[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustomScheduleStore } from '~/stores/customSchedule';

const customScheduleStore = useCustomScheduleStore();
const {
  grade,
  hasSpecialFlex,
  flexBlock,
  specialFlexDay,
  specialFlexName,
  advisoryDay,
  showOneOnOnes,
} = storeToRefs(customScheduleStore);

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
  return [];
});

const blocks = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
];

const grades = [
  { value: '9', label: '9th' },
  { value: '10', label: '10th' },
  { value: '11', label: '11th' },
  { value: '12', label: '12th' },
];
</script>
