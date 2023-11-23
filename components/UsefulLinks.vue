<template>
  <UDropdown :items="items" mode="hover">
    <UButton
      :ui="buttonUIs.links"
      label="Useful Links"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    />
    <template #item="{ item }">
      <a :href="item.icon" target="_blank" class="h-full w-full p-1 text-left">
        {{ item.label }}
      </a>
    </template>
  </UDropdown>
</template>

<script setup lang="ts">
import { useStylesStore } from '~/stores/styles';

const stylesStore = useStylesStore();
const { buttonUIs } = storeToRefs(stylesStore);

const items = [
  [
    {
      label: 'Bay Site',
      icon: 'https://www.bayschoolsf.org/',
      click: 'Placeholder',
    },
    {
      label: 'Canvas',
      icon: 'https://bayschoolsf.instructure.com/',
      click: 'Placeholder',
    },
    {
      label: 'My Bay',
      icon: 'https://bayschoolsf.myschoolapp.com/',
      click: 'Placeholder',
    },
    {
      label: 'Announcement Digest',
      icon: 'https://docs.google.com/document/d/1c5YzT06GTn5CdX_7X7jZ2Ghhd5pK1aHhRRbOY78cr2M/',
      click: 'Placeholder',
    },
    {
      label: 'Bay Riptide',
      icon: 'https://sites.google.com/bayschoolsf.org/the-bay-riptide/',
      click: 'Placeholder',
    },
    {
      label: 'Bay Calendar',
      icon: 'https://www.bayschoolsf.org/calendar',
      click: 'Placeholder',
    },
  ],
];
</script>
