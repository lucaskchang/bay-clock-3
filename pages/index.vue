<template>
  <div>
    <Header />
    <ProgressBars />
    <ButtonBar />

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import { useCustomScheduleStore } from '~/stores/customSchedule';
import { useStylesStore } from '~/stores/styles';

const customScheduleStore = useCustomScheduleStore();
const stylesStore = useStylesStore();

onMounted(() => {
  const customSchedule = localStorage.getItem('customSchedule');
  if (customSchedule) {
    const schedule = JSON.parse(customSchedule);
    customScheduleStore.blockNames = schedule.blockNames;
    customScheduleStore.clubs = schedule.clubs;
    customScheduleStore.activityDays = schedule.activityDays;
    customScheduleStore.activitySchedule = schedule.activitySchedule;
    customScheduleStore.activityName = schedule.activityName;
    customScheduleStore.immersiveName = schedule.immersiveName;
    customScheduleStore.grade = schedule.grade;
    customScheduleStore.hasSpecialFlex = schedule.hasSpecialFlex;
    customScheduleStore.flexBlock = schedule.flexBlock;
    customScheduleStore.specialFlexDay = schedule.specialFlexDay;
    customScheduleStore.advisoryDay = schedule.advisoryDay;
    customScheduleStore.showOneOnOnes = schedule.showOneOnOnes;
  }

  const styles = localStorage.getItem('styles');
  if (styles) {
    const style = JSON.parse(styles);
    stylesStore.showClock = style.showClock;
    stylesStore.showStatus = style.showStatus;
    stylesStore.showDate = style.showDate;
    stylesStore.showIndicator = style.showIndicator;
    stylesStore.progressColor = style.progressColor;
    stylesStore.isProgressRounded = style.isProgressRounded;
    stylesStore.buttonStyles = style.buttonStyles;
    stylesStore.useDetailedTime = style.useDetailedTime;
  }
});

useHead({
  title: 'Bay Clock 3',
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/ico',
      href: '/favicon.ico'
    }
  ]
})

useSeoMeta({
  description: 'Bay Clock is a customizable schedule viewer for students at The Bay School of San Francisco.',
  ogTitle: 'Bay Clock 3',
  ogDescription: 'Bay Clock is a customizable schedule viewer for students at The Bay School of San Francisco.',
  ogImage: '/preview.png',
  ogUrl: 'https://bayclock.org/',
  twitterTitle: 'Bay Clock 3',
  twitterDescription: 'Bay Clock is a customizable schedule viewer for students at The Bay School of San Francisco.',
  twitterImage: '/preview.png',
  twitterCard: 'summary'
})
</script>
