<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UModal
    v-model="isImportConfirmOpen"
    :ui="{
      container: 'items-center',
      base: 'overflow-auto',
    }"
  >
    <div class="p-4">
      <p class="text-2xl font-semibold">
        Import this schedule?
      </p>
      <p>This link has a custom schedule in it. Importing it will replace your current custom schedule.</p>
      <div class="mt-4 flex flex-row gap-2">
        <UButton
          size="lg"
          label="Yes, import"
          @click="confirmImport()"
        />
        <UButton
          size="lg"
          color="red"
          variant="ghost"
          label="No, keep mine"
          @click="declineImport()"
        />
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { useNowStore } from '~/stores/now';
import { useCustomScheduleStore } from '~/stores/customSchedule';
import { useStylesStore } from '~/stores/styles';

const nowStore = useNowStore();
const { updateTimeLoop } = nowStore;
const customScheduleStore = useCustomScheduleStore();
const stylesStore = useStylesStore();
const colorMode = useColorMode();
const route = useRoute();
const router = useRouter();
const notification = useToast();

const isImportConfirmOpen = ref(false);
const pendingImport = ref<Record<string, unknown> | null>(null);

function clearImportParam() {
  const query = { ...route.query };
  delete query.import;
  router.replace({ query });
}

function confirmImport() {
  isImportConfirmOpen.value = false;
  if (!pendingImport.value) return;
  customScheduleStore.applySchedule(pendingImport.value);
  localStorage.setItem('customSchedule', JSON.stringify(customScheduleStore.getExportableState()));
  pendingImport.value = null;
  notification.add({
    icon: 'i-heroicons-check-badge',
    title: 'Schedule Imported',
    description: 'The shared schedule has been imported and saved.',
    color: 'green',
    timeout: 2000,
  });
}

function declineImport() {
  isImportConfirmOpen.value = false;
  pendingImport.value = null;
}

onMounted(() => {
  updateTimeLoop();

  try {
    const customSchedule = localStorage.getItem('customSchedule');
    if (customSchedule) {
      customScheduleStore.applySchedule(JSON.parse(customSchedule));
    }
  }
  catch {
    localStorage.removeItem('customSchedule');
  }

  const importParam = route.query.import;
  if (typeof importParam === 'string') {
    try {
      pendingImport.value = decodeScheduleFromUrl(importParam);
      isImportConfirmOpen.value = true;
    }
    catch {
      notification.add({
        icon: 'i-heroicons-x-circle',
        title: 'Import Failed',
        description: 'That schedule link could not be read.',
        color: 'red',
        timeout: 2000,
      });
    }
    finally {
      clearImportParam();
    }
  }

  try {
    const styles = localStorage.getItem('styles');
    if (styles) {
      const style = JSON.parse(styles);
      stylesStore.showClock = style.showClock;
      stylesStore.showStatus = style.showStatus;
      stylesStore.showDate = style.showDate;
      stylesStore.showIndicator = style.showIndicator;
      stylesStore.progressColor = style.progressColor;
      stylesStore.isProgressRounded = style.isProgressRounded;
      stylesStore.buttonStyles = style.buttonStyles;
      stylesStore.showGraduationCountdown = style.showGraduationCountdown;
      stylesStore.useDetailedTime = style.useDetailedTime;
      stylesStore.isDarkMode = colorMode.value === 'dark';
    }
  }
  catch {
    localStorage.removeItem('styles');
  }
});
</script>
