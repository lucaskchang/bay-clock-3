<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <UTabs
      v-if="!studying"
      :items="items"
      class="w-full md:w-2/3 2xl:w-1/2"
    >
      <template #default="{ item, selected }">
        <span
          class="truncate"
          :class="[selected && 'text-primary-500 dark:text-primary-400']"
        >
          {{ item.label }}
        </span>
      </template>
      <template #item="{ item }">
        <div v-if="item.label === 'Pomodoro'">
          <div class="flex flex-row items-center justify-center space-x-4 p-4">
            <UInput
              v-model="pomodoroStudyTime"
              icon="i-heroicons-pencil"
              placeholder="Study Time"
              type="number"
              size="lg"
              required
            />
            <UInput
              v-model="pomodoroBreakTime"
              icon="i-heroicons-hand-raised"
              placeholder="Break Time"
              type="number"
              size="lg"
              required
            />
            <UInput
              v-model="pomodoroRepititions"
              icon="i-heroicons-arrow-path"
              placeholder="Repititions"
              type="number"
              size="lg"
              required
            />
            <UInput
              v-model="className"
              icon="i-heroicons-user-group"
              placeholder="Class Name"
              size="lg"
              required
            />
            <UButton
              size="lg"
              @click="startPomodoroStudy"
            >
              Start Studying
            </UButton>
          </div>
        </div>
        <div v-else-if="item.label === 'Countdown'">
          <div class="flex flex-row items-center justify-center space-x-4 p-4">
            <UInput
              v-model="countdownTime"
              icon="i-heroicons-clock"
              placeholder="Study Time"
              type="number"
              size="lg"
              required
            />
            <UInput
              v-model="className"
              icon="i-heroicons-user-group"
              placeholder="Class Name"
              size="lg"
              required
            />
            <UButton
              size="lg"
              @click="startCountdown"
            >
              Start Countdown
            </UButton>
          </div>
        </div>
      </template>
    </UTabs>
    <div
      v-else
      class="flex flex-col items-center justify-center space-y-4 text-center"
    >
      <div
        v-if="pomodoro"
        class="text-4xl font-bold"
      >
        <p v-if="onBreak">
          Break #{{ currentRepitition }}<span v-if="className"> - {{ className }}</span>
        </p>
        <p v-else>
          Study Session #{{ currentRepitition }}<span v-if="className"> - {{ className }}</span>
        </p>
      </div>
      <p
        v-else
        class="text-4xl font-bold"
      >
        Studying - {{ className }}
      </p>
      <p class="text-8xl font-bold">
        {{ Math.floor(timeLeft / 60) }}:{{ (timeLeft % 60).toString().padStart(2, '0') }}
      </p>
      <UButton
        size="lg"
        @click="stopStudySession"
      >
        Stop Studying
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const className = ref('');
const countdownTime = ref(0);
const pomodoroStudyTime = ref(25);
const pomodoroBreakTime = ref(5);
const pomodoroRepititions = ref();
const currentRepitition = ref(0);
const pomodoro = ref(false);
const timeLeft = ref(0);
const studying = ref(false);
const onBreak = ref(false);
let studyInterval;
let breakInterval;

function startPomodoroStudy() {
  pomodoro.value = true;
  studying.value = true;
  currentRepitition.value += 1;
  timeLeft.value = Math.round(pomodoroStudyTime.value * 60);
  studyInterval = setInterval(() => {
    timeLeft.value -= 1;
    if (timeLeft.value <= 0) {
      clearInterval(studyInterval);
      if (currentRepitition.value < pomodoroRepititions.value) {
        onBreak.value = true;
        startPomodoroBreak();
        return;
      }
      else {
        studying.value = false;
        onBreak.value = false;
        return;
      }
    }
  }, 1000);
}

function startPomodoroBreak() {
  timeLeft.value = Math.round(pomodoroBreakTime.value * 60);
  breakInterval = setInterval(() => {
    timeLeft.value -= 1;
    if (timeLeft.value <= 0) {
      clearInterval(breakInterval);
      onBreak.value = false;
      startPomodoroStudy();
      return;
    }
  }, 1000);
}

function startCountdown() {
  pomodoro.value = false;
  studying.value = true;
  timeLeft.value = Math.round(countdownTime.value * 60);
  studyInterval = setInterval(() => {
    timeLeft.value -= 1;
    if (timeLeft.value <= 0) {
      clearInterval(studyInterval);
      studying.value = false;
      return;
    }
  }, 1000);
}

function stopStudySession() {
  clearInterval(studyInterval);
  clearInterval(breakInterval);
  studying.value = false;
  onBreak.value = false;
}

const items = [
  {
    label: 'Pomodoro',
    icon: 'i-icon-park-outline:tomato',
  }, {
    label: 'Countdown',
    icon: 'i-heroicons-clock',
  },
];
</script>
