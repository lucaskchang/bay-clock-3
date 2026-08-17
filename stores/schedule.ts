import { useNowStore } from './now';

export const useScheduleStore = defineStore('schedule', () => {
  const nowStore = useNowStore();
  const { time } = storeToRefs(nowStore);
  const { getDaySchedule } = useDaySchedule();

  const isWeekend = computed(() => {
    return time.value.getDay() === 0 || time.value.getDay() === 6;
  });

  const today = computed(() => getDaySchedule(time.value));

  const isSpecialSchedule = computed(() => today.value.isSpecialSchedule);
  const isBreak = computed(() => today.value.isBreak);
  const isImmersive = computed(() => today.value.isImmersive);
  const breakName = computed(() => today.value.breakName);
  const daysLeft = computed(() => today.value.breakEnd
    ? Math.ceil((today.value.breakEnd.getTime() - time.value.getTime()) / (1000 * 3600 * 24))
    : 0);

  // convert today's schedule to timestamps -- no blocks are shown during a break
  const schedule = computed(() => {
    const parsedSchedule: Record<string, { start: number, end: number }> = {};
    if (today.value.isBreak) {
      return parsedSchedule;
    }
    for (const [block, timeframe] of Object.entries(today.value.schedule)) {
      parsedSchedule[block] = {
        start: new Date().setHours(
          timeframe.start.hour,
          timeframe.start.minute,
          0,
          0,
        ),
        end: new Date().setHours(timeframe.end.hour, timeframe.end.minute, 0, 0),
      };
    }
    return parsedSchedule;
  });

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
