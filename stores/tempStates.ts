export const useTempStatesStore = defineStore('tempStates', () => {
  const tempSchedule = ref({});
  const tempStyles = ref({});

  return {
    tempSchedule,
    tempStyles,
  };
});
