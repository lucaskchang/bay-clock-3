export const useNowStore = defineStore("now", () => {
  const time = ref(new Date());

  function updateTimeLoop() {
    setInterval(() => {
      time.value = new Date();
    }, 1000);
  }

  return { time, updateTimeLoop };
});
