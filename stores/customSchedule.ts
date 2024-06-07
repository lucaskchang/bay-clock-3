import activityScheduleJSON from '~/assets/data/activity_schedule.json';

export const useCustomScheduleStore = defineStore('customSchedule', () => {
  const blockNames: Ref<Record<string, string>> = ref({
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    E: 'E',
    F: 'F',
    'Morning Meeting': 'Morning Meeting',
    Tutorial: 'Tutorial',
  });

  const clubs: Ref<Record<string, string>> = ref({
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
  });

  const activityDays: Ref<Record<string, boolean>> = ref({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
  });

  const activitySchedule: Ref<Record<string, { start: string; end: string }>> =
    ref(activityScheduleJSON);

  const activityName = ref('Activities + Sports/Drama');
  const immersiveName = ref('');

  const grade = ref('0');
  const hasSpecialFlex = ref('No');
  const flexBlock = ref('');
  const specialFlexDay = ref('');
  const specialFlexName = computed(() => {
    if (grade.value === '9') return '9th Grade Seminar';
    if (grade.value === '10') return 'Choices';
    if (grade.value === '11') return 'College Counseling';
    if (grade.value === '12') return 'College Counseling';
  }) as Ref<string>;
  const customSpecialFlexName = ref('');

  const advisoryDay = ref('');
  const showOneOnOnes = ref('No');

  function $reset() {
    blockNames.value = {
      A: 'A',
      B: 'B',
      C: 'C',
      D: 'D',
      E: 'E',
      F: 'F',
      'Morning Meeting': 'Morning Meeting',
      Tutorial: 'Tutorial',
    };
    clubs.value = {
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: '',
    };
    activityDays.value = {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
    };
    activitySchedule.value = {
      Monday: { start: '15:50', end: '17:30' },
      Tuesday: { start: '15:50', end: '17:30' },
      Wednesday: { start: '15:50', end: '17:30' },
      Thursday: { start: '15:50', end: '17:30' },
      Friday: { start: '15:50', end: '17:30' },
      Saturday: { start: '15:50', end: '17:30' },
      Sunday: { start: '15:50', end: '17:30' },
    };
    activityName.value = 'Activities + Sports/Drama';
    immersiveName.value = '';
    grade.value = '0';
    hasSpecialFlex.value = 'No';
    flexBlock.value = '';
    specialFlexDay.value = '';
    advisoryDay.value = '';
    showOneOnOnes.value = 'No';
  }

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
    specialFlexName,
    customSpecialFlexName,
    advisoryDay,
    showOneOnOnes,
    $reset,
  };
});
