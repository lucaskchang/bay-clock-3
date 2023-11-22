function getHoverColor(color: string) {
  const colorName = color.split('-')[0];
  const colorValue = color.split('-')[1];
  if (colorValue === '50') {
    return `${colorName}-100`;
  } else if (colorValue === '900') {
    return `${colorName}-950`;
  } else {
    return `${colorName}-${parseInt(colorValue) + 100}`;
  }
}

export const useStylesStore = defineStore('styles', () => {
  // header styles
  const showClock = ref(true);
  const showStatus = ref(true);
  const showDate = ref(true);
  const showIndicator = ref(true);

  // progress bar styles
  const progressColor = ref('blue-400');
  const progressHoverColor = computed(() => getHoverColor(progressColor.value));
  const isProgressRounded = ref(true);

  // button styles
  const linksButtonColor = ref('blue-400');
  const lunchButtonColor = ref('blue-400');
  const scheduleButtonColor = ref('blue-400');
  const stylesButtonColor = ref('blue-400');
  const weeklyButtonColor = ref('blue-400');
  const linksButtonHoverColor = computed(() =>
    getHoverColor(linksButtonColor.value),
  );
  const lunchButtonHoverColor = computed(() =>
    getHoverColor(lunchButtonColor.value),
  );
  const scheduleButtonHoverColor = computed(() =>
    getHoverColor(scheduleButtonColor.value),
  );
  const stylesButtonHoverColor = computed(() =>
    getHoverColor(stylesButtonColor.value),
  );
  const weeklyButtonHoverColor = computed(() =>
    getHoverColor(weeklyButtonColor.value),
  );
  const isLinksRounded = ref(true);
  const isLunchRounded = ref(true);
  const isScheduleRounded = ref(true);
  const isStylesRounded = ref(true);
  const isWeeklyRounded = ref(true);

  return {
    showClock,
    showStatus,
    showDate,
    showIndicator,
    progressColor,
    progressHoverColor,
    isProgressRounded,
    linksButtonColor,
    lunchButtonColor,
    scheduleButtonColor,
    stylesButtonColor,
    weeklyButtonColor,
    linksButtonHoverColor,
    lunchButtonHoverColor,
    scheduleButtonHoverColor,
    stylesButtonHoverColor,
    weeklyButtonHoverColor,
    isLinksRounded,
    isLunchRounded,
    isScheduleRounded,
    isStylesRounded,
    isWeeklyRounded,
  };
});
