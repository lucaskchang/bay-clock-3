<template>
  <div>
    <UButton
      :ui="buttonUIs.schedule"
      label="Teacher Schedules"
      @click="isOpen = true"
    />
    <UModal
      v-model="isOpen"
      :ui="{
        width: 'sm:max-w-4xl',
        container: 'items-center',
        base: 'overflow-auto',
        wrapper: 'z-25',
      }"
    >
      <div class="min-h-[384px] w-full p-4">
        <p class="text-2xl font-semibold">
          Teacher Schedules
        </p>
        <UInputMenu
          v-model="selectedTeacher"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Search..."
          class="mt-4"
          :options="teacherNames"
          size="xl"
        />
        <div class="mt-4 space-y-2">
          <p class="text-xl font-semibold">
            {{ selectedTeacher.split(',')[1] }} {{ selectedTeacher.split(',')[0] }}
          </p>
          <div
            v-for="(classInfo, block, index) in selectedTeacherObject"
            :key="block"
          >
            <div
              v-if="index !== 0"
              class="rounded-full p-1 text-lg ring-1 ring-gray-300"
            >
              <p class="ml-2">
                {{ block }}: {{ classInfo === '' ? 'Free Period' : classInfo }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="flex flex-row justify-between gap-2 justify-self-end pt-4"
        >
          <div>
            <UButton
              size="lg"
              label="Close"
              @click="isOpen = false"
            />
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import teacherSchedules from '~/assets/data/teacher_schedules.json';
import { useStylesStore } from '~/stores/styles';

const stylesStore = useStylesStore();
const { buttonUIs } = storeToRefs(stylesStore);

const isOpen = ref(false);
const selectedTeacherObject = computed(() => teacherSchedules.find(teacher => teacher['Teacher\'s Name'] === selectedTeacher.value));
const teacherNames = teacherSchedules.map(teacher => teacher['Teacher\'s Name']);
const selectedTeacher = ref('');
</script>
