<template>
  <div class="space-y-4">
    <p class="text-xl font-semibold">Classes</p>
    <UInput
      v-for="name in Object.keys(tempSchedule.blockNames).splice(0, 6)"
      :key="name"
      v-model="tempSchedule.blockNames[name]"
      :placeholder="name"
    />
    <UDivider />
    <p class="text-xl font-semibold">Other</p>
    <UInput
      v-for="name in Object.keys(tempSchedule.blockNames).splice(6, 9)"
      :key="name"
      v-model="tempSchedule.blockNames[name]"
      :placeholder="name"
    />
    <UInput
      v-if="tempSchedule.specialFlexName"
      v-model="tempSchedule.customSpecialFlexName"
      :placeholder="tempSchedule.specialFlexName"
    />
  </div>
</template>

<script setup lang="ts">
import { useCustomScheduleStore } from '~/stores/customSchedule';
import { useTempStatesStore } from '~/stores/tempStates';

const customScheduleStore = useCustomScheduleStore();
const tempStatesStore = useTempStatesStore();
const { tempSchedule } = storeToRefs(tempStatesStore);
const { blockNames, specialFlexName, customSpecialFlexName } =
  storeToRefs(customScheduleStore);
</script>
