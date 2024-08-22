export const useContentfulStore = defineStore('contentful', () => {
  const space = ref(null);
  async function loadSpace() {
    space.value = await $fetch('/api/contentful');
  }

  return {
    space,
    loadSpace,
  };
});
