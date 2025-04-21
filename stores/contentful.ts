import regularScheduleJSON from '~/assets/data/regular_schedule.json';
import specialSchedulesJSON from '~/assets/data/special_schedules.json';
import immersiveScheduleJSON from '~/assets/data/immersive_schedule.json';
import activityScheduleJSON from '~/assets/data/activity_schedule.json';
import breaksJSON from '~/assets/data/breaks.json';
import usefulLinksJSON from '~/assets/data/useful_links.json';

export const useContentfulStore = defineStore('contentful', () => {
  const activitySchedule = ref(activityScheduleJSON);
  const breaks = ref(breaksJSON);
  const specialSchedules = ref(specialSchedulesJSON);
  const immersiveSchedule = ref(immersiveScheduleJSON);
  const regularSchedule = ref(regularScheduleJSON);
  const usefulLinks = ref(usefulLinksJSON);

  return {
    activitySchedule,
    breaks,
    specialSchedules,
    immersiveSchedule,
    regularSchedule,
    usefulLinks,
  };
});
