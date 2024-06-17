<template>
  <div>
    <UButton :ui="buttonUIs.styles" label="Customize" @click="isOpen = true" />
    <UModal
      v-model="isOpen"
      :ui="{
        width: 'sm:max-w-4xl',
      }"
      prevent-close
      @close-prevented="cancelChanges()"
    >
      <div class="w-full">
        <UTabs :items="items" orientation="vertical" :ui="tabsStyling">
          <template #item="{ item }">
            <p class="mb-4 text-2xl font-bold">{{ item.label }}</p>
            <StylesHeader v-if="item.label === 'Header'" />
            <StylesBars v-if="item.label === 'Bars'" />
            <StylesButtons v-if="item.label === 'Buttons'" />
            <StylesOther v-if="item.label === 'Other'" />
            <div
              class="flex flex-row justify-between gap-2 justify-self-end pt-4"
            >
              <div>
                <UButton size="lg" label="Save" @click="saveChanges()" />
                <UButton
                  size="lg"
                  variant="ghost"
                  label="Reset"
                  @click="isResetOpen = true"
                />
              </div>
              <div>
                <UButton
                  size="lg"
                  color="red"
                  label="Cancel"
                  @click="cancelChanges()"
                />
              </div>
            </div>
          </template>
        </UTabs>
      </div>
    </UModal>
    <UModal v-model="isResetOpen">
      <div class="p-4">
        <p class="text-2xl font-semibold">Are you sure?</p>
        <p>All schedules will be reset to their defaults.</p>
        <div class="mt-4 flex flex-row gap-2">
          <UButton size="lg" label="Yes, reset" @click="resetStyles()" />
          <UButton
            size="lg"
            color="red"
            variant="ghost"
            label="Nevermind"
            @click="isResetOpen = false"
          />
        </div>
      </div>
    </UModal>
    <UModal v-model="isCancelOpen">
      <div class="p-4">
        <p class="text-2xl font-semibold">Are you sure?</p>
        <p>Any changes you made will be lost.</p>
        <div class="mt-4 flex flex-row gap-2">
          <UButton
            size="lg"
            label="Yes, cancel changes"
            @click="
              isCancelOpen = false;
              isOpen = false;
              revert();
            "
          />
          <UButton
            size="lg"
            color="red"
            variant="ghost"
            label="Nevermind"
            @click="isCancelOpen = false"
          />
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import tabsStyling from "~/assets/styles/tabs.json";
import { useStylesStore } from "~/stores/styles";

const stylesStore = useStylesStore();
const { buttonUIs } = storeToRefs(stylesStore);

const isOpen = ref(false);
const isResetOpen = ref(false);
const isCancelOpen = ref(false);
const items = [
  { label: "Header" },
  { label: "Bars" },
  { label: "Buttons" },
  { label: "Presets" },
  { label: "Other" },
];
const notification = useToast();

function getCurrentStylesState() {
  return {
    showClock: stylesStore.showClock,
    showStatus: stylesStore.showStatus,
    showDate: stylesStore.showDate,
    showIndicator: stylesStore.showIndicator,
    progressColor: stylesStore.progressColor,
    isProgressRounded: stylesStore.isProgressRounded,
    buttonStyles: {
      ...stylesStore.buttonStyles,
    },
    useDetailedTime: stylesStore.useDetailedTime,
  };
}

function resetStyles() {
  isResetOpen.value = false;
  stylesStore.$reset();
  isOpen.value = false;

  notification.add({
    icon: "i-heroicons-arrow-path",
    title: "Changes Saved",
    description: "Your styles have been reset to its defaults.",
    color: "blue",
    timeout: 2000,
  });
}

function saveChanges() {
  isOpen.value = false;
  const styles = getCurrentStylesState();
  localStorage.setItem("styles", JSON.stringify(styles));

  notification.add({
    icon: "i-heroicons-check-badge",
    title: "Changes Saved",
    description: "All new changes to your styles have been saved.",
    color: "green",
    timeout: 2000,
  });
}

let initialStyles = getCurrentStylesState();

function cancelChanges() {
  const newStyles = getCurrentStylesState();
  if (JSON.stringify(newStyles) === JSON.stringify(initialStyles)) {
    isOpen.value = false;
  } else {
    isCancelOpen.value = true;
  }
}

function revert() {
  stylesStore.showClock = initialStyles.showClock;
  stylesStore.showStatus = initialStyles.showStatus;
  stylesStore.showDate = initialStyles.showDate;
  stylesStore.showIndicator = initialStyles.showIndicator;
  stylesStore.progressColor = initialStyles.progressColor;
  stylesStore.isProgressRounded = initialStyles.isProgressRounded;
  stylesStore.buttonStyles = initialStyles.buttonStyles;
  stylesStore.useDetailedTime = initialStyles.useDetailedTime;

  notification.add({
    icon: "i-heroicons-x-circle",
    title: "Changes Cancelled",
    description: "All new changes to your styles have been cancelled.",
    color: "red",
    timeout: 2000,
  });
}

watch(isOpen, (value) => {
  if (value) {
    initialStyles = getCurrentStylesState();
  }
});
</script>
