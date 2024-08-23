import regularScheduleJSON from '~/assets/data/regular_schedule.json';
import specialSchedulesJSON from '~/assets/data/special_schedules.json';
import immersiveScheduleJSON from '~/assets/data/immersive_schedule.json';
import activityScheduleJSON from '~/assets/data/activity_schedule.json';
import breaksJSON from '~/assets/data/breaks.json';

export const useContentfulStore = defineStore('contentful', () => {
  const activitySchedule = ref(activityScheduleJSON);
  const breaks = ref(breaksJSON);
  const specialSchedules = ref(specialSchedulesJSON);
  const immersiveSchedule = ref(immersiveScheduleJSON);
  const regularSchedule = ref(regularScheduleJSON);
  const menuImages = ref([])
  async function loadSpace() {
    const space = await $fetch('/api/contentful');
    activitySchedule.value = space.items.find(item => item.sys.id === '42Z0UUEUxuVBkEpE4pdL24').fields.schedule;
    breaks.value = space.items.find(item => item.sys.id === '3BWYUhVpaGVuvTZknDIlSq').fields.schedule;
    specialSchedules.value = space.items.find(item => item.sys.id === '23iKtUXKRVwiW8wIQXqLtO').fields.schedule;
    immersiveSchedule.value = space.items.find(item => item.sys.id === '4tyj0EtnaOuSnHJEmoe0Bn').fields.schedule;
    regularSchedule.value = space.items.find(item => item.sys.id === '54Vls3YjBcSgpLFIwfZMZs').fields.schedule;
    const menu = space.items.find(item => item.sys.id === '7lGYtrHU7fBiumTMjY68GE').fields.images;
    menuImages.value = [];
    for (const asset of menu) {
      const image = space.includes.Asset.find(a => a.sys.id === asset.sys.id);
      menuImages.value.push(image.fields.file.url);
    }
  }

  return {
    activitySchedule,
    breaks,
    specialSchedules,
    immersiveSchedule,
    regularSchedule,
    menuImages,
    loadSpace,
  };
});
