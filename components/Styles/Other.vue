<template>
  <div>
    <p class="text-xl font-semibold">Theme</p>
    <div class="flex flex-row items-center">
      <p class="mr-2">Dark Mode</p>
      <UToggle v-model="isDark" />
    </div>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  },
});
</script>
