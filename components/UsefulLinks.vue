<template>
  <UDropdown :items="items">
    <UButton
      :ui="buttonUIs.links"
      label="Useful Links"
      trailing-icon="i-heroicons-chevron-down-20-solid"
    />
    <template #item="{ item }">
      <a
        :href="item.icon"
        target="_blank"
        rel="noopener noreferrer"
        class="size-full p-1 text-left"
      >
        {{ item.label }}
      </a>
    </template>

    <template #custom="{ item }">
      <a
        :href="item.icon"
        target="_blank"
        rel="noopener noreferrer"
        class="size-full p-1 text-left"
      >
        <span class="truncate">{{ item.label }}</span>
      </a>
      <UIcon
        name="i-heroicons-x-mark"
        class="ms-auto size-4 shrink-0 text-red-400 hover:text-red-600 dark:text-red-500"
        @click="removeLink(item)"
      />
    </template>

    <template #add="{ item }">
      <UIcon
        :name="item.icon"
        class="size-4 shrink-0 text-gray-400 dark:text-gray-500"
      />
      <div class="size-full p-1 pl-0 text-left">
        <span class="truncate">Add Link</span>
      </div>
    </template>
  </UDropdown>
  <UModal v-model="isOpen">
    <div class="p-4">
      <p class="text-2xl font-semibold">
        Add a new link
      </p>
      <div class="mt-4 space-y-4">
        <UInput
          v-model="name"
          label="Name"
          placeholder="Link Name"
        />
        <UInput
          v-model="url"
          label="URL"
          placeholder="Link URL"
        />
      </div>
      <div class="mt-4 flex flex-row">
        <UButton
          size="lg"
          label="Add"
          @click="
            addLink();
          "
        />
        <UButton
          class="ms-auto"
          size="lg"
          color="red"
          variant="ghost"
          label="Cancel"
          @click="isOpen = false"
        />
      </div>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { useStylesStore } from '~/stores/styles';

const stylesStore = useStylesStore();
const { buttonUIs } = storeToRefs(stylesStore);

const isOpen = ref(false);
const url = ref('');
const name = ref('');
const notification = useToast();

const customLinks: Ref<{ label: string, icon: string, click: string, slot: string }[]> = ref([]);

function addLink() {
  if (name.value === '' || url.value === '') {
    notification.add({
      icon: 'i-heroicons-exclamation-triangle',
      title: 'Complete Form',
      description: 'You have incomplete fields.',
      color: 'red',
      timeout: 2000,
    });
    return;
  }
  customLinks.value.push({
    label: name.value,
    icon: url.value,
    click: 'Placeholder',
    slot: 'custom',
  });
  localStorage.setItem('customLinks', JSON.stringify(customLinks.value));

  notification.add({
    icon: 'i-heroicons-check-badge',
    title: 'Link Added',
    description: `${name.value} (${url.value}) has been added to useful links.`,
    color: 'green',
    timeout: 2000,
  });
  isOpen.value = false;
  setTimeout(() => {
    name.value = '';
    url.value = '';
  }, 250);
}

function removeLink(item: { label: string, icon: string, click: string, slot: string }) {
  notification.add({
    icon: 'i-heroicons-x-circle',
    title: 'Link Removed',
    description: `${item.label} (${item.icon}) has been removed.`,
    color: 'red',
    timeout: 2000,
  });
  // delay so that the click event doesn't trigger the add link modal
  setTimeout(() => {
    customLinks.value = customLinks.value.filter(link => link !== item);
    localStorage.setItem('customLinks', JSON.stringify(customLinks.value));
  }, 100);
}

const items = computed(() => {
  return [
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
    [
      ...customLinks.value,
      {
        label: 'Add New Link',
        icon: 'i-heroicons-plus',
        click: () => {
          isOpen.value = true;
        },
        slot: 'add',
      },
    ],
  ];
});

onMounted(() => {
  const storedCustomLinks = localStorage.getItem('customLinks');
  if (storedCustomLinks) {
    customLinks.value = JSON.parse(storedCustomLinks);
  }
});
</script>
