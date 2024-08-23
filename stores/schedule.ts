import { useContentfulStore } from './contentful';
import { useCustomScheduleStore } from './customSchedule';
import { useNowStore } from './now';

export const useScheduleStore = defineStore('schedule', () => {
  const customScheduleStore = useCustomScheduleStore();
  const contentfulStore = useContentfulStore();
  const nowStore = useNowStore();
  const {
    blockNames,
    clubs,
    activityDays,
    activitySchedule,
    activityName,
    immersiveName,
    hasSpecialFlex,
    flexBlock,
    specialFlexDay,
    specialFlexName,
    customSpecialFlexName,
    advisoryDay,
    showOneOnOnes,
  } = storeToRefs(customScheduleStore);
  const { time } = storeToRefs(nowStore);
  const { breaks, specialSchedules, immersiveSchedule, regularSchedule } = storeToRefs(contentfulStore);

  const isWeekend = ref(time.value.getDay() === 0 || time.value.getDay() === 6);
  const isSpecialSchedule = ref(false);
  const isBreak = ref(false);
  const isImmersive = ref(false);
  const breakName = ref('');
  const daysLeft = ref(0);
  const schedule = computed(() => {
    const day = useDateFormat(time.value, 'dddd');
    let unparsedSchedule: Record<
      string,
      {
        start: { hour: number, minute: number }
        end: { hour: number, minute: number }
      }
    > = {};

    // load regular schedule
    for (const [name, timeframe] of Object.entries(
      regularSchedule.value[day.value],
    )) {
      if (name === 'Group Advisory/1-on-1s') {
        if (!advisoryDay.value) {
          unparsedSchedule[name] = timeframe;
        }
        else if (advisoryDay.value === day.value) {
          unparsedSchedule['Group Advisory'] = timeframe;
        }
        else if (showOneOnOnes.value === 'Yes') {
          unparsedSchedule['Advisor 1-on-1'] = timeframe;
        }
      }
      else if (name === flexBlock.value) {
        if (
          hasSpecialFlex.value === 'Yes'
          && day.value === specialFlexDay.value
        ) {
          unparsedSchedule[
            customSpecialFlexName.value || specialFlexName.value
          ] = timeframe;
        }
        else {
          unparsedSchedule[name] = timeframe;
        }
      }
      else {
        unparsedSchedule[name] = timeframe;
      }
    }

    // check for special schedule
    for (const [date, specialSchedule] of Object.entries(specialSchedules.value)) {
      const specialScheduleDate = new Date(date);
      if (time.value.toDateString() === specialScheduleDate.toDateString()) {
        unparsedSchedule = specialSchedule;
        isSpecialSchedule.value = true;
      }
    }

    // check for immersives
    for (const date of immersiveSchedule.value.dates) {
      const startDate = new Date(date.start);
      const endDate = new Date(date.end);
      if (time.value >= startDate && time.value <= endDate) {
        unparsedSchedule = immersiveSchedule.value.schedule;
        isImmersive.value = true;
      }
    }

    // check for breaks
    for (const [name, timeframe] of Object.entries(breaks.value)) {
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
    const parsedSchedule = {} as Record<string, { start: number, end: number }>;
    for (const [block, timeframe] of Object.entries(unparsedSchedule)) {
      let blockName = block;
      if (blockNames.value[blockName]) {
        blockName = blockNames.value[blockName];
      }
      else if (blockName === 'Lunch') {
        if (clubs.value[day.value]) {
          blockName = clubs.value[day.value];
        }
      }
      // gimmicky way to handle immersives so that you can display the morning and afternoon immersives with the same block
      else if (blockName === 'REMOVEImmersive' && immersiveName.value) {
        blockName = `REMOVE${immersiveName.value}`;
      }
      else if (blockName === 'DELETEImmersive' && immersiveName.value) {
        blockName = `DELETE${immersiveName.value}`;
      }
      parsedSchedule[blockName] = {
        start: new Date().setHours(
          timeframe.start.hour,
          timeframe.start.minute,
          0,
          0,
        ),
        end: new Date().setHours(timeframe.end.hour, timeframe.end.minute, 0),
      };
    }

    // check for activities
    if (activityDays.value[day.value] && isBreak.value === false) {
      parsedSchedule[activityName.value || 'Activities + Sports/Drama'] = {
        start: new Date().setHours(
          Number(activitySchedule.value[day.value].start.split(':')[0]),
          Number(activitySchedule.value[day.value].start.split(':')[1]),
          0,
          0,
        ),
        end: new Date().setHours(
          Number(activitySchedule.value[day.value].end.split(':')[0]),
          Number(activitySchedule.value[day.value].end.split(':')[1]),
          0,
          0,
        ),
      };
    }

    return parsedSchedule;
  }) as ComputedRef<Record<string, { start: number, end: number }>>;

  return {
    schedule,
    isWeekend,
    isSpecialSchedule,
    isBreak,
    isImmersive,
    breakName,
    daysLeft,
  };
});
