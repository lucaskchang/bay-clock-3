<template>
  <div>
    <UButton
      :ui="buttonUIs.weekly"
      label="Weekly Schedule"
      @click="isOpen = true"
    />
    <UModal
      v-model="isOpen"
      :ui="{
        width: 'sm:max-w-7xl',
        container: 'items-center',
      }"
    >
      <div
        class="flex min-h-[384px] w-full flex-row gap-4 overflow-x-scroll p-8"
      >
        <div
          v-for="(schedule, day) of weeklySchedule"
          :key="day"
          class="flex w-2/3 min-w-48 flex-col gap-4 md:w-1/5"
        >
          <p class="text-center text-2xl font-semibold">
            {{ day }}
          </p>
          <div
            v-for="(timeframe, block) of schedule"
            :key="block"
            class="h-28 w-full rounded-lg pl-2 pt-1"
            :class="colorKey[block]"
          >
            <p
              v-if="isImmersive && (block.slice(0, 6) === 'REMOVE' || block.slice(0, 6) === 'DELETE')"
              class="text-xl font-semibold md:text-2xl"
            >
              {{ block.slice(6) }}
            </p>
            <p
              v-else
              class="text-lg font-semibold md:text-xl"
            >
              {{ block }}
            </p>
            <div class="text-lg font-semibold md:text-xl">
              <p v-if="timeframe.start === '0:00' && timeframe.end === '11:59'">
                All Day
              </p>
              <p v-else>
                {{ timeframe.start }} - {{ timeframe.end }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useStylesStore } from '~/stores/styles';
import { useNowStore } from '~/stores/now';

const stylesStore = useStylesStore();
const { buttonUIs } = storeToRefs(stylesStore);

const nowStore = useNowStore();
const { time } = storeToRefs(nowStore);
const { getDaySchedule } = useDaySchedule();

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const colors = [
  'bg-blue-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-cyan-500',
  'bg-lime-500',
  'bg-rose-500',
  'bg-teal-400',
  'bg-fuchsia-400',
  'bg-amber-400',
  'bg-emerald-400',
  'bg-violet-400',
];

const colorKey = ref({}) as Ref<Record<string, string>>;
const colorKeyIndex = ref(0);

const isImmersive = ref(false);

function formatHour(hour: number, minute: number) {
  return `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')}`;
}

type WeekSchedule = Record<string, Record<string, { start: string, end: string }>>;

// a plain ref updated in a watchEffect, rather than a computed, because
// building it also has to grow the shared colorKey/isImmersive state
const weeklySchedule = ref({}) as Ref<WeekSchedule>;

watchEffect(() => {
  const output: WeekSchedule = {};
  for (const dayOfWeek of days) {
    const dayDate = new Date(time.value);
    const dayOfMonth = dayDate.getDay() === 0 ? 7 : dayDate.getDay();
    const diff = dayDate.getDate() - dayOfMonth + days.indexOf(dayOfWeek) + 1;
    dayDate.setDate(diff);

    const dayResult = getDaySchedule(dayDate);
    if (dayResult.isImmersive) {
      isImmersive.value = true;
    }

    // convert schedule to display strings
    const parsedSchedule: Record<string, { start: string, end: string }> = {};
    for (const [blockName, timeframe] of Object.entries(dayResult.schedule)) {
      parsedSchedule[blockName] = {
        start: formatHour(timeframe.start.hour, timeframe.start.minute),
        end: formatHour(timeframe.end.hour, timeframe.end.minute),
      };
      if (!colorKey.value[blockName]) {
        colorKey.value[blockName] = colors[colorKeyIndex.value];
        colorKeyIndex.value++;
      }
    }
    output[dayOfWeek] = parsedSchedule;
  }
  weeklySchedule.value = output;
});

const isOpen = ref(false);
</script>
