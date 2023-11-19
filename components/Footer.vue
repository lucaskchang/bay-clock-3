<template>
  <div class="mx-auto py-8 text-center text-lg">
    <p>
      Created by
      <a
        href="https://www.lucaskchang.com/"
        target="_blank"
        class="font-semibold text-blue-400 hover:text-blue-500"
      >
        Lucas Chang
      </a>
    </p>
    <p>
      <!-- <a
        class="font-semibold text-blue-400 hover:text-blue-500"
        href="https://github.com/lukajaa/bay-clock-3"
        target="_blank"
      >
        Code
      </a> -->
      <span
        class="cursor-pointer font-semibold text-blue-400 hover:text-blue-500"
        @click="isChangelogOpen = true"
      >
        Code
      </span>
      /
      <span
        class="cursor-pointer font-semibold text-blue-400 hover:text-blue-500"
        @click="isToolsOpen = true"
      >
        Tools
      </span>
      /
      <a
        class="font-semibold text-blue-400 hover:text-blue-500"
        href="https://forms.gle/khAXGXiUMoAoskKQA"
        target="_blank"
      >
        Feedback
      </a>
      /
      <span
        class="cursor-pointer font-semibold text-blue-400 hover:text-blue-500"
        @click="isCreditsOpen = true"
      >
        Credits
      </span>
    </p>

    <UModal v-model="isCreditsOpen">
      <div class="p-4">
        <p class="text-2xl font-semibold">Credits</p>
        <p>Past keepers of the clock</p>
      </div>
    </UModal>
    <UModal v-model="isToolsOpen">
      <div class="p-4">
        <p class="text-2xl font-semibold">Tools</p>
        <p>Stuff will be here</p>
      </div>
    </UModal>
    <UModal
      v-model="isChangelogOpen"
      :ui="{
        width: 'sm:max-w-2xl',
      }"
    >
      <div class="space-y-2 p-4">
        <p class="text-2xl font-semibold">Changelog</p>
        <p class="mt-4 text-xl font-bold">New in v3.0</p>
        <p class="text-lg font-semibold">Features</p>
        <p>
          🔗 Revert useful links dashboard to dropdown (sometimes simpler is
          better)
        </p>
        <p>
          🥪 Zoomable lunch menu (I don't know why this was not possible
          previously)
        </p>
        <p>✍️ Option to add custom names for tutorial and morning meeting</p>
        <p>💪 Customizable 'special flex class'</p>
        <p>🧑‍🤝‍🧑 Option to specify which day you have group advisory</p>
        <p class="text-lg font-semibold">Code Upgrades</p>
        <p>📦 Upgraded all packages to latest versions</p>
        <p>
          ⚡ Switched to Nuxt for maximum performance and developer experience
        </p>
        <p>🎨 Switched to TailwindCSS + NuxtUI for more customizability</p>
        <p>🦾 Added VueUse and Pinia for more functionality</p>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const isCreditsOpen = ref(false);
const isToolsOpen = ref(false);
const isChangelogOpen = ref(false);
</script>
