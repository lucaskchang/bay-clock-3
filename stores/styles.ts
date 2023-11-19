export const useStylesStore = defineStore('styles', () => {
  const showClock = ref(true);
  const showStatus = ref(true);
  const showDate = ref(true);
  const showIndicator = ref(true);

  const progressColor = ref('blue-400');
  const isProgressRounded = ref(true);

  return {
    showClock,
    showStatus,
    showDate,
    showIndicator,
    progressColor,
    isProgressRounded,
  };
});
