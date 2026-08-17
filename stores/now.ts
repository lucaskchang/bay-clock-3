export const useNowStore = defineStore('now', () => {
  const time = ref(new Date());
  let handle: ReturnType<typeof setInterval> | null = null;

  function updateTimeLoop() {
    if (handle) return;
    handle = setInterval(() => {
      time.value = new Date();
    }, 1000);
  }

  return { time, updateTimeLoop };
});
