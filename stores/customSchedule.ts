export const useCustomScheduleStore = defineStore('customSchedule', () => {
  const blockNames: Ref<Record<string, string>> = ref({
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    E: 'E',
    F: 'F',
    'Morning Meeting': 'Morning Meeting',
    'Group Advisory/1-on-1s': 'Group Advisory/1-on-1s',
    Tutorial: 'Tutorial',
  });

  const clubs: Ref<Record<string, string>> = ref({
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
    Saturday: '',
    Sunday: '',
  });

  const activityDays: Ref<Record<string, boolean>> = ref({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  });

  const activitySchedule: Ref<Record<string, { start: string; end: string }>> =
    ref({
      Monday: { start: '15:50', end: '17:30' },
      Tuesday: { start: '15:50', end: '17:30' },
      Wednesday: { start: '15:50', end: '17:30' },
      Thursday: { start: '15:50', end: '17:30' },
      Friday: { start: '15:50', end: '17:30' },
      Saturday: { start: '15:50', end: '17:30' },
      Sunday: { start: '15:50', end: '17:30' },
    });

  const activityName = ref('Activities + Sports/Drama');
  const immersiveName = ref('');

  const grade = ref('0');
  const hasSpecialFlex = ref('No');
  const flexBlock = ref('');
  const specialFlexDay = ref('');

  const advisoryDay = ref('');

  return {
    blockNames,
    clubs,
    activityDays,
    activitySchedule,
    activityName,
    immersiveName,
    grade,
    hasSpecialFlex,
    flexBlock,
    specialFlexDay,
    advisoryDay,
  };
});
