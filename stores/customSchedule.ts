import { useScheduleDataStore } from './scheduleData';

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIME_PATTERN = /^\d{2}:\d{2}$/;

const DEFAULT_BLOCK_NAMES: Record<string, string> = {
  'A': 'A',
  'B': 'B',
  'C': 'C',
  'D': 'D',
  'E': 'E',
  'F': 'F',
  'Morning Meeting': 'Morning Meeting',
  'Tutorial': 'Tutorial',
};

const DEFAULT_CLUBS: Record<string, string> = {
  Monday: '',
  Tuesday: '',
  Wednesday: '',
  Thursday: '',
  Friday: '',
};

const DEFAULT_ACTIVITY_DAYS: Record<string, boolean> = {
  Monday: true,
  Tuesday: true,
  Wednesday: true,
  Thursday: true,
  Friday: true,
};

const DEFAULT_ACTIVITY_SCHEDULE: Record<string, { start: string, end: string }> = {
  Monday: { start: '15:50', end: '17:30' },
  Tuesday: { start: '15:50', end: '17:30' },
  Wednesday: { start: '15:50', end: '17:30' },
  Thursday: { start: '15:50', end: '17:30' },
  Friday: { start: '15:50', end: '17:30' },
};

export const useCustomScheduleStore = defineStore('customSchedule', () => {
  const scheduleDataStore = useScheduleDataStore();
  const { activitySchedule } = storeToRefs(scheduleDataStore);

  const blockNames: Ref<Record<string, string>> = ref({ ...DEFAULT_BLOCK_NAMES });
  const clubs: Ref<Record<string, string>> = ref({ ...DEFAULT_CLUBS });
  const activityDays: Ref<Record<string, boolean>> = ref({ ...DEFAULT_ACTIVITY_DAYS });

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
    return null;
  }) as Ref<string>;
  const customSpecialFlexName = ref('');

  const advisoryDay = ref('');
  const showOneOnOnes = ref('No');

  function $reset() {
    blockNames.value = { ...DEFAULT_BLOCK_NAMES };
    clubs.value = { ...DEFAULT_CLUBS };
    activityDays.value = { ...DEFAULT_ACTIVITY_DAYS };
    activitySchedule.value = JSON.parse(JSON.stringify(DEFAULT_ACTIVITY_SCHEDULE));
    activityName.value = 'Activities + Sports/Drama';
    immersiveName.value = '';
    grade.value = '0';
    hasSpecialFlex.value = 'No';
    flexBlock.value = '';
    specialFlexDay.value = '';
    customSpecialFlexName.value = '';
    advisoryDay.value = '';
    showOneOnOnes.value = 'No';
  }

  function getExportableState() {
    return {
      blockNames: { ...blockNames.value },
      clubs: { ...clubs.value },
      activityDays: { ...activityDays.value },
      activitySchedule: JSON.parse(JSON.stringify(activitySchedule.value)),
      activityName: activityName.value,
      immersiveName: immersiveName.value,
      grade: grade.value,
      hasSpecialFlex: hasSpecialFlex.value,
      flexBlock: flexBlock.value,
      specialFlexDay: specialFlexDay.value,
      customSpecialFlexName: customSpecialFlexName.value,
      advisoryDay: advisoryDay.value,
      showOneOnOnes: showOneOnOnes.value,
    };
  }

  // Validates and merges an arbitrary object (parsed from localStorage, an
  // imported file, or a share link) over the defaults, so a malformed or
  // partial payload can't write bad shapes into refs that other components
  // index directly (e.g. activitySchedule.Monday.start).
  function applySchedule(input: unknown) {
    if (!input || typeof input !== 'object') return false;
    const data = input as Record<string, unknown>;

    const nextBlockNames = { ...DEFAULT_BLOCK_NAMES };
    if (data.blockNames && typeof data.blockNames === 'object') {
      const source = data.blockNames as Record<string, unknown>;
      for (const key of Object.keys(nextBlockNames)) {
        if (typeof source[key] === 'string') nextBlockNames[key] = source[key] as string;
      }
    }
    blockNames.value = nextBlockNames;

    const nextClubs = { ...DEFAULT_CLUBS };
    if (data.clubs && typeof data.clubs === 'object') {
      const source = data.clubs as Record<string, unknown>;
      for (const day of WEEKDAYS) {
        if (typeof source[day] === 'string') nextClubs[day] = source[day] as string;
      }
    }
    clubs.value = nextClubs;

    const nextActivityDays = { ...DEFAULT_ACTIVITY_DAYS };
    if (data.activityDays && typeof data.activityDays === 'object') {
      const source = data.activityDays as Record<string, unknown>;
      for (const day of WEEKDAYS) {
        if (typeof source[day] === 'boolean') nextActivityDays[day] = source[day] as boolean;
      }
    }
    activityDays.value = nextActivityDays;

    const nextActivitySchedule = JSON.parse(JSON.stringify(DEFAULT_ACTIVITY_SCHEDULE));
    if (data.activitySchedule && typeof data.activitySchedule === 'object') {
      const source = data.activitySchedule as Record<string, unknown>;
      for (const day of WEEKDAYS) {
        const entry = source[day] as { start?: unknown, end?: unknown } | undefined;
        if (
          entry
          && typeof entry.start === 'string' && TIME_PATTERN.test(entry.start)
          && typeof entry.end === 'string' && TIME_PATTERN.test(entry.end)
        ) {
          nextActivitySchedule[day] = { start: entry.start, end: entry.end };
        }
      }
    }
    activitySchedule.value = nextActivitySchedule;

    if (typeof data.activityName === 'string') activityName.value = data.activityName;
    if (typeof data.immersiveName === 'string') immersiveName.value = data.immersiveName;
    if (typeof data.grade === 'string') grade.value = data.grade;
    if (typeof data.hasSpecialFlex === 'string') hasSpecialFlex.value = data.hasSpecialFlex;
    if (typeof data.flexBlock === 'string') flexBlock.value = data.flexBlock;
    if (typeof data.specialFlexDay === 'string') specialFlexDay.value = data.specialFlexDay;
    if (typeof data.customSpecialFlexName === 'string') customSpecialFlexName.value = data.customSpecialFlexName;
    if (typeof data.advisoryDay === 'string') advisoryDay.value = data.advisoryDay;
    if (typeof data.showOneOnOnes === 'string') showOneOnOnes.value = data.showOneOnOnes;

    return true;
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
    getExportableState,
    applySchedule,
    $reset,
  };
});
