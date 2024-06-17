import buttonStyling from "~/assets/styles/buttons.json";

type Styles = {
  color: string;
  isRounded: boolean;
};

function getHoverColor(color: string) {
  let hoverColor = "";
  const colorName = color.split("-")[1];
  const colorValue = color.split("-")[2];
  if (colorValue === "50") {
    hoverColor = `${colorName}-100`;
  } else if (colorValue === "900") {
    hoverColor = `${colorName}-950`;
  } else {
    hoverColor = `${colorName}-${parseInt(colorValue) + 100}`;
  }
  return hoverColor;
}

function getButtonStyles(styles: Styles) {
  const color = styles.color;
  const hoverColor = getHoverColor(color);
  return {
    ...buttonStyling,
    rounded: styles.isRounded ? "rounded-full" : "rounded",
    variant: {
      solid: `${color} hover:bg-${hoverColor} dark:${color} dark:hover:bg-${hoverColor} ${
        parseInt(color.split("-")[2]) >= 400
          ? "text-white dark:text-white"
          : "text-black dark:text-black"
      }`,
    },
  };
}

export const useStylesStore = defineStore("styles", () => {
  // header styles
  const showClock = ref(true);
  const showStatus = ref(true);
  const showDate = ref(true);
  const showIndicator = ref(true);

  // progress bar styles
  const progressColor = ref("blue-400");
  const progressHoverColor = computed(() =>
    getHoverColor(`bg-${progressColor.value}`),
  );
  const isProgressRounded = ref(true);

  // button styles
  const buttonStyles = ref({
    links: {
      color: "bg-blue-400",
      isRounded: true,
    },
    lunch: {
      color: "bg-blue-400",
      isRounded: true,
    },
    schedule: {
      color: "bg-blue-400",
      isRounded: true,
    },
    styles: {
      color: "bg-blue-400",
      isRounded: true,
    },
    weekly: {
      color: "bg-blue-400",
      isRounded: true,
    },
  });
  const buttonUIs = computed(() => {
    return {
      links: getButtonStyles(buttonStyles.value.links),
      lunch: getButtonStyles(buttonStyles.value.lunch),
      schedule: getButtonStyles(buttonStyles.value.schedule),
      styles: getButtonStyles(buttonStyles.value.styles),
      weekly: getButtonStyles(buttonStyles.value.weekly),
    };
  });

  const useDetailedTime = ref(false);

  function $reset() {
    showClock.value = true;
    showStatus.value = true;
    showDate.value = true;
    showIndicator.value = true;
    progressColor.value = "blue-400";
    isProgressRounded.value = true;
    buttonStyles.value = {
      links: {
        color: "bg-blue-400",
        isRounded: true,
      },
      lunch: {
        color: "bg-blue-400",
        isRounded: true,
      },
      schedule: {
        color: "bg-blue-400",
        isRounded: true,
      },
      styles: {
        color: "bg-blue-400",
        isRounded: true,
      },
      weekly: {
        color: "bg-blue-400",
        isRounded: true,
      },
    };
    useDetailedTime.value = false;
  }

  return {
    showClock,
    showStatus,
    showDate,
    showIndicator,
    progressColor,
    progressHoverColor,
    isProgressRounded,
    buttonStyles,
    buttonUIs,
    useDetailedTime,
    $reset,
  };
});
