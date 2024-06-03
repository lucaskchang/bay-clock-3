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
      prevent-close
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
                <UButton
                  size="lg"
                  variant="ghost"
                  label="Reset"
                  @click="isResetOpen = true"
                />
              </div>
              <div>
                <UButton
                  size="lg"
                  color="red"
                  label="Cancel"
                  @click="cancelChanges()"
                />
              </div>
            </div>
          </template>
        </UTabs>
      </div>
    </UModal>
    <UModal v-model="isResetOpen">
      <div class="p-4">
        <p class="text-2xl font-semibold">Are you sure?</p>
        <p>All schedules will be reset to their defaults.</p>
        <div class="mt-4 flex flex-row gap-2">
          <UButton
            size="lg"
            label="Yes, reset"
            @click="
              isResetOpen = false;
              customScheduleStore.$reset();
              isOpen = false;
            "
          />
          <UButton
            size="lg"
            color="red"
            variant="ghost"
            label="Nevermind"
            @click="isResetOpen = false"
          />
        </div>
      </div>
    </UModal>
    <UModal v-model="isCancelOpen">
      <div class="p-4">
        <p class="text-2xl font-semibold">Are you sure?</p>
        <p>Any changes you made will be lost.</p>
        <div class="mt-4 flex flex-row gap-2">
          <UButton
            size="lg"
            label="Yes, cancel changes"
            @click="
              isCancelOpen = false;
              isOpen = false;
              revert();
            "
          />
          <UButton
            size="lg"
            color="red"
            variant="ghost"
            label="Nevermind"
            @click="isCancelOpen = false"
          />
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import tabsStyling from '~/assets/styles/tabs.json';
import { useStylesStore } from '~/stores/styles';
import { useCustomScheduleStore } from '~/stores/customSchedule';

const stylesStore = useStylesStore();
const customScheduleStore = useCustomScheduleStore();
const { buttonUIs } = storeToRefs(stylesStore);

const isOpen = ref(false);
const isResetOpen = ref(false);
const isCancelOpen = ref(false);
const tabs = [
  { label: 'Classes' },
  { label: 'Clubs' },
  { label: 'Activities' },
  { label: 'Immersives' },
  { label: 'Extras' },
];

let initialSchedule = {
  blockNames: customScheduleStore.blockNames,
  clubs: customScheduleStore.clubs,
  activityDays: customScheduleStore.activityDays,
  activitySchedule: customScheduleStore.activitySchedule,
  activityName: customScheduleStore.activityName,
  immersiveName: customScheduleStore.immersiveName,
  grade: customScheduleStore.grade,
  hasSpecialFlex: customScheduleStore.hasSpecialFlex,
  flexBlock: customScheduleStore.flexBlock,
  specialFlexDay: customScheduleStore.specialFlexDay,
  advisoryDay: customScheduleStore.advisoryDay,
  showOneOnOnes: customScheduleStore.showOneOnOnes,
};

function cancelChanges() {
  const newSchedule = {
    blockNames: customScheduleStore.blockNames,
    clubs: customScheduleStore.clubs,
    activityDays: customScheduleStore.activityDays,
    activitySchedule: customScheduleStore.activitySchedule,
    activityName: customScheduleStore.activityName,
    immersiveName: customScheduleStore.immersiveName,
    grade: customScheduleStore.grade,
    hasSpecialFlex: customScheduleStore.hasSpecialFlex,
    flexBlock: customScheduleStore.flexBlock,
    specialFlexDay: customScheduleStore.specialFlexDay,
    advisoryDay: customScheduleStore.advisoryDay,
    showOneOnOnes: customScheduleStore.showOneOnOnes,
  };
  if (JSON.stringify(newSchedule) === JSON.stringify(initialSchedule)) {
    isOpen.value = false;
  } else {
    isCancelOpen.value = true;
  }
}

function revert() {
  customScheduleStore.blockNames = initialSchedule.blockNames;
  customScheduleStore.clubs = initialSchedule.clubs;
  customScheduleStore.activityDays = initialSchedule.activityDays;
  customScheduleStore.activitySchedule = initialSchedule.activitySchedule;
  customScheduleStore.activityName = initialSchedule.activityName;
  customScheduleStore.immersiveName = initialSchedule.immersiveName;
  customScheduleStore.grade = initialSchedule.grade;
  customScheduleStore.hasSpecialFlex = initialSchedule.hasSpecialFlex;
  customScheduleStore.flexBlock = initialSchedule.flexBlock;
  customScheduleStore.specialFlexDay = initialSchedule.specialFlexDay;
  customScheduleStore.advisoryDay = initialSchedule.advisoryDay;
  customScheduleStore.showOneOnOnes = initialSchedule.showOneOnOnes;
  isOpen.value = false;
}

watch(isOpen, (value) => {
  if (value) {
    initialSchedule = {
      blockNames: customScheduleStore.blockNames,
      clubs: customScheduleStore.clubs,
      activityDays: customScheduleStore.activityDays,
      activitySchedule: customScheduleStore.activitySchedule,
      activityName: customScheduleStore.activityName,
      immersiveName: customScheduleStore.immersiveName,
      grade: customScheduleStore.grade,
      hasSpecialFlex: customScheduleStore.hasSpecialFlex,
      flexBlock: customScheduleStore.flexBlock,
      specialFlexDay: customScheduleStore.specialFlexDay,
      advisoryDay: customScheduleStore.advisoryDay,
      showOneOnOnes: customScheduleStore.showOneOnOnes,
    };
  }
});
</script>
