<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <p class="text-xl font-semibold">
        Export
      </p>
      <p class="text-sm text-gray-400 dark:text-gray-500">
        Download your current schedule as a file, or copy a link that carries the whole
        schedule with it — open that link on another device (like your phone) to bring
        it over.
      </p>
      <div class="flex flex-row flex-wrap gap-2">
        <UButton
          variant="ghost"
          icon="i-heroicons-arrow-down-tray"
          label="Download File"
          @click="exportSchedule()"
        />
        <UButton
          variant="ghost"
          icon="i-heroicons-link"
          label="Copy Link"
          @click="copyShareLink()"
        />
      </div>
    </div>
    <UDivider />
    <div class="space-y-2">
      <p class="text-xl font-semibold">
        Import
      </p>
      <p class="text-sm text-gray-400 dark:text-gray-500">
        Choose a schedule file someone exported from Bay Clock. It'll fill in the tabs
        to the left so you can review it — nothing is kept until you hit Save.
      </p>
      <div class="flex flex-row flex-wrap gap-2">
        <UButton
          variant="ghost"
          icon="i-heroicons-arrow-up-tray"
          label="Choose File"
          @click="triggerImport()"
        />
      </div>
      <input
        ref="importInput"
        type="file"
        accept="application/json"
        class="hidden"
        @change="importSchedule($event)"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustomScheduleStore } from '~/stores/customSchedule';

const customScheduleStore = useCustomScheduleStore();
const notification = useToast();
const importInput = ref<HTMLInputElement | null>(null);

function exportSchedule() {
  const payload = wrapScheduleExport(customScheduleStore.getExportableState());
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'bayclock-schedule.json';
  link.click();
  URL.revokeObjectURL(url);
}

async function copyShareLink() {
  const encoded = encodeScheduleForUrl(customScheduleStore.getExportableState());
  const url = `${window.location.origin}${window.location.pathname}?import=${encoded}`;
  await navigator.clipboard.writeText(url);
  notification.add({
    icon: 'i-heroicons-link',
    title: 'Link Copied',
    description: 'Share it, then open it on another device to import this schedule.',
    color: 'green',
    timeout: 2000,
  });
}

function triggerImport() {
  importInput.value?.click();
}

function importSchedule(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result as string);
      const schedule = parsed && typeof parsed === 'object' && parsed.schedule ? parsed.schedule : parsed;
      customScheduleStore.applySchedule(schedule);
      notification.add({
        icon: 'i-heroicons-check-badge',
        title: 'Schedule Imported',
        description: 'Review the changes, then Save to keep them.',
        color: 'green',
        timeout: 2000,
      });
    }
    catch {
      notification.add({
        icon: 'i-heroicons-x-circle',
        title: 'Import Failed',
        description: 'That file could not be read as a schedule export.',
        color: 'red',
        timeout: 2000,
      });
    }
  };
  reader.readAsText(file);
  input.value = '';
}
</script>
