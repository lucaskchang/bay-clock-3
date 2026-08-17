import { useScheduleDataStore } from '~/stores/scheduleData';
import { useCustomScheduleStore } from '~/stores/customSchedule';

export type Timeframe = { hour: number, minute: number };
export type UnparsedBlock = { start: Timeframe, end: Timeframe };
export type UnparsedSchedule = Record<string, UnparsedBlock>;

export interface DayScheduleOptions {
  // whether special schedules / immersives / breaks can override the regular schedule
  applyOverrides?: boolean
  // whether custom block renames, club names, and immersive names are applied
  applyCustomNames?: boolean
}

export interface DayScheduleResult {
  schedule: UnparsedSchedule
  isBreak: boolean
  isImmersive: boolean
  isSpecialSchedule: boolean
  breakName: string
  breakEnd: Date | null
}

// Resolves the block layout for a single calendar day, applying the regular
// weekly schedule plus advisory/flex substitutions, special schedule /
// immersive / break overrides, custom block renames, and the activities
// block. Shared by the header/progress bars (today), the weekly schedule
// modal, and the printable schedule generator so the rules only live once.
export function useDaySchedule() {
  const scheduleDataStore = useScheduleDataStore();
  const customScheduleStore = useCustomScheduleStore();
  const { breaks, specialSchedules, immersiveSchedule, regularSchedule } = storeToRefs(scheduleDataStore);
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

  function getDaySchedule(date: Date, options: DayScheduleOptions = {}): DayScheduleResult {
    const applyOverrides = options.applyOverrides ?? true;
    const applyCustomNames = options.applyCustomNames ?? true;

    const day = useDateFormat(date, 'dddd').value;

    let unparsedSchedule: UnparsedSchedule = {};
    let isBreak = false;
    let isImmersive = false;
    let isSpecialSchedule = false;
    let breakName = '';
    let breakEnd: Date | null = null;

    // load regular schedule
    for (const [name, timeframe] of Object.entries(regularSchedule.value[day] ?? {})) {
      if (name === 'Group Advisory/1-on-1s') {
        if (!advisoryDay.value) {
          unparsedSchedule[name] = timeframe;
        }
        else if (advisoryDay.value === day) {
          unparsedSchedule['Group Advisory'] = timeframe;
        }
        else if (showOneOnOnes.value === 'Yes') {
          unparsedSchedule['Advisor 1-on-1'] = timeframe;
        }
      }
      else if (name === flexBlock.value) {
        if (hasSpecialFlex.value === 'Yes' && day === specialFlexDay.value) {
          unparsedSchedule[customSpecialFlexName.value || specialFlexName.value] = timeframe;
        }
        else {
          unparsedSchedule[name] = timeframe;
        }
      }
      else {
        unparsedSchedule[name] = timeframe;
      }
    }

    if (applyOverrides) {
      // check for special schedule
      for (const [scheduleDate, specialSchedule] of Object.entries(specialSchedules.value)) {
        if (date.toDateString() === new Date(scheduleDate).toDateString()) {
          unparsedSchedule = specialSchedule;
          isSpecialSchedule = true;
        }
      }

      // check for immersives
      for (const range of immersiveSchedule.value.dates) {
        const startDate = new Date(range.start);
        const endDate = new Date(range.end);
        if (date >= startDate && date <= endDate) {
          unparsedSchedule = immersiveSchedule.value.schedule;
          isImmersive = true;
        }
      }

      // check for breaks -- represented as a single all-day block so the
      // weekly views have something to render in that day's column
      for (const [name, timeframe] of Object.entries(breaks.value)) {
        const breakStart = new Date(timeframe.start);
        const breakEndDate = new Date(timeframe.end);
        if (date >= breakStart && date <= breakEndDate) {
          unparsedSchedule = {
            [name]: {
              start: { hour: 0, minute: 0 },
              end: { hour: 23, minute: 59 },
            },
          };
          isBreak = true;
          breakName = name;
          breakEnd = breakEndDate;
        }
      }
    }

    // resolve block names (custom renames, clubs, immersive naming)
    const namedSchedule: UnparsedSchedule = {};
    for (const [block, timeframe] of Object.entries(unparsedSchedule)) {
      let blockName = block;
      if (applyCustomNames && blockNames.value[blockName]) {
        blockName = blockNames.value[blockName];
      }
      else if (blockName === 'Lunch' && applyCustomNames) {
        if (clubs.value[day]) {
          blockName = clubs.value[day];
        }
      }
      else if (blockName === 'REMOVEImmersive' && immersiveName.value && applyCustomNames) {
        blockName = `REMOVE${immersiveName.value}`;
      }
      else if (blockName === 'DELETEImmersive' && immersiveName.value && applyCustomNames) {
        blockName = `DELETE${immersiveName.value}`;
      }
      namedSchedule[blockName] = timeframe;
    }

    // check for activities
    if (activityDays.value[day] && !isBreak) {
      const [startHour, startMinute] = activitySchedule.value[day].start.split(':').map(Number);
      const [endHour, endMinute] = activitySchedule.value[day].end.split(':').map(Number);
      namedSchedule[activityName.value || 'Activities + Sports/Drama'] = {
        start: { hour: startHour, minute: startMinute },
        end: { hour: endHour, minute: endMinute },
      };
    }

    return {
      schedule: namedSchedule,
      isBreak,
      isImmersive,
      isSpecialSchedule,
      breakName,
      breakEnd,
    };
  }

  return { getDaySchedule };
}
