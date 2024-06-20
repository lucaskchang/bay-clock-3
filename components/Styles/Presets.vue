<template>
  <div>
    <div class="space-y-4 md:px-4">
      <div
        v-for="(color, team) of olympicTeams"
        :key="team"
        class="w-full h-12 rounded-lg shadow flex flex-row items-center p-2 hover:scale-105 transition duration-300 ease-in-out"
        :class="`bg-${color}-400`"
        @click="isPresetOpen = true; chosenTeam = color;"
      >
        <div class="flex flex-col rounded-full h-8 w-8 shadow" :class="`bg-${color}-600`" />
        <p class="ml-2 text-lg font-semibold">{{ team }} Team</p>
      </div>
    </div>
    <UModal v-model="isPresetOpen">
      <div class="p-4">
        <p class="text-2xl font-semibold">Are you sure?</p>
        <p>Any existing button and progress bar colors will be overwritten.</p>
        <div class="mt-4 flex flex-row gap-2">
          <UButton
            size="lg"
            label="Yes, apply preset"
            @click="
              applyPreset(chosenTeam)
              isPresetOpen = false;
              $emit('preset-applied');
            "
          />
          <UButton
            size="lg"
            color="red"
            variant="ghost"
            label="Nevermind"
            @click="isPresetOpen = false"
          />
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useStylesStore } from '~/stores/styles';

const stylesStore = useStylesStore();
const { buttonStyles, progressColor } = storeToRefs(stylesStore);

const chosenTeam = ref('');
const isPresetOpen = ref(false);
const olympicTeams = {
  Blue: 'blue',
  Crimson: 'red',
  Gold: 'amber',
  Gray: 'gray',
  Green: 'green',
  Orange: 'orange',
  Pink: 'rose',
  Purple: 'purple',
}

function applyPreset(color: string) {
  for (const button in buttonStyles.value) {
    buttonStyles.value[button].color = `bg-${color}-600`;
  }
  progressColor.value = `${color}-400`;
}
</script>
