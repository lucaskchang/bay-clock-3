import { useCustomScheduleStore } from './customSchedule';
import regularSchedule from '~/assets/data/regular_schedule.json';
import specialSchedules from '~/assets/data/special_schedules.json';
import immersiveSchedule from '~/assets/data/immersive_schedule.json';
import breaks from '~/assets/data/breaks.json';

export const useScheduleStore = defineStore('schedule', () => {
  const customScheduleStore = useCustomScheduleStore();
  const {
    blockNames,
    clubs,
    activityDays,
    activitySchedule,
    activityName,
    immersiveName,
  } = storeToRefs(customScheduleStore);
  const time = useNow();

  const isWeekend = ref(time.value.getDay() === 0 || time.value.getDay() === 6);
  const isSpecialSchedule = ref(false);
  const isBreak = ref(false);
  const breakName = ref('');
  const daysLeft = ref(0);
  const schedule = computed(() => {
    console.log('schedule computed');

    let unparsedSchedule: Record<
      string,
      {
        start: { hour: number; minute: number };
        end: { hour: number; minute: number };
      }
    > = regularSchedule[time.value.getDay()];

    // check for special schedule
    for (const [date, specialSchedule] of Object.entries(specialSchedules)) {
      const specialScheduleDate = new Date(date);
      if (time.value.toDateString() === specialScheduleDate.toDateString()) {
        unparsedSchedule = specialSchedule;
      }
    }

    // check for immersives
    for (const date of immersiveSchedule.dates) {
      const startDate = new Date(date.start);
      const endDate = new Date(date.end);
      if (time.value >= startDate && time.value <= endDate) {
        unparsedSchedule = immersiveSchedule.schedule;
      }
    }

    for (const [name, timeframe] of Object.entries(breaks)) {
      const breakStart = new Date(timeframe.start);
      const breakEnd = new Date(timeframe.end);
      if (time.value >= breakStart && time.value <= breakEnd) {
        daysLeft.value = Math.ceil(
          (breakEnd.getTime() - time.value.getTime()) / (1000 * 3600 * 24),
        );
        breakName.value = name;
        isBreak.value = true;
        unparsedSchedule = {};
      }
    }

    // convert schedule to timestamps
    const parsedSchedule = {} as Record<string, { start: number; end: number }>;
    const day = useDateFormat(time.value, 'dddd');
    for (const [block, timeframe] of Object.entries(unparsedSchedule)) {
      let blockName = block;
      if (blockNames.value[blockName]) {
        blockName = blockNames.value[blockName];
      } else if (blockName === 'Lunch') {
        if (clubs.value[day.value]) {
          blockName = clubs.value[day.value];
        }
      } else if (
        (blockName === 'Immersive Morning' ||
          blockName === 'Immersive Afternoon') &&
        immersiveName
      ) {
        return immersiveName;
      }
      parsedSchedule[blockName] = {
        start: new Date().setHours(
          timeframe.start.hour,
          timeframe.start.minute,
        ),
        end: new Date().setHours(timeframe.end.hour, timeframe.end.minute),
      };
    }

    // check for activities
    if (activityDays.value[day.value]) {
      parsedSchedule[activityName.value || 'Activities + Sports/Drama'] = {
        start: new Date().setHours(
          Number(activitySchedule.value[day.value].start.split(':')[0]),
          Number(activitySchedule.value[day.value].start.split(':')[1]),
        ),
        end: new Date().setHours(
          Number(activitySchedule.value[day.value].end.split(':')[0]),
          Number(activitySchedule.value[day.value].end.split(':')[1]),
        ),
      };
    }
    return parsedSchedule;
  }) as ComputedRef<Record<string, { start: number; end: number }>>;

  return {
    schedule,
    isWeekend,
    isSpecialSchedule,
    isBreak,
    breakName,
    daysLeft,
  };
});