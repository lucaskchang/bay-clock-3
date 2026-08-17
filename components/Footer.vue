<template>
  <div class="mx-auto py-8 text-center text-lg">
    <p>
      Created by Lucas Chang '24
    </p>
    <p>
      <a
        class="text-blue-400 hover:text-blue-500"
        href="https://github.com/lucaskchang/bay-clock-3"
        target="_blank"
        rel="noopener noreferrer"
      >
        Code
      </a>
      /
      <span
        class="cursor-pointer text-blue-400 hover:text-blue-500"
        @click="isToolsOpen = true"
      >
        Tools
      </span>
      /
      <span
        class="cursor-pointer text-blue-400 hover:text-blue-500"
        @click="isCreditsOpen = true"
      >
        Credits
      </span>
    </p>

    <UModal v-model="isCreditsOpen">
      <div class="space-y-2 p-4 font-light">
        <p class="text-2xl font-semibold">
          Credits
        </p>
        <p>Managers: Suriya Bou '27, Ryan Chow '27, and Pat Nuchitsiripattara '28</p>
        <p>Previous Managers: Sam West '26 and Kainoa Newton '26</p>
        <p>Special thanks to Joel Krauska (2030 dad) and Kainoa Newton for contributing to the project.</p>
        <p>
          Interested in helping out? Contact me at lucaskchang@gmail.com and read <a
            class="text-blue-400 hover:text-blue-500"
            href="https://lucaschang.notion.site/Bay-Clock-Guide-4b3b8d76ee0a428083cfd9cc37f1ca89"
            target="_blank"
            rel="noopener noreferrer"
          >this guide</a>.
        </p>
      </div>
    </UModal>
    <UModal
      v-model="isToolsOpen"
      :ui="{
        width: 'sm:max-w-4xl',
      }"
    >
      <div class="p-4">
        <p class="text-2xl font-semibold">
          Tools
        </p>
        <div class="flex flex-col md:flex-row">
          <div class="flex w-full p-2 md:w-1/3 md:flex-col">
            <a
              href="https://baydle.lucaskchang.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="rounded-md ring-4 ring-gray-200 transition duration-300 ease-in-out hover:ring-blue-400">
                <NuxtImg
                  quality="80"
                  format="webp"
                  loading="lazy"
                  src="/baydle.jpg"
                  alt="Baydle Game"
                  class="w-full rounded-t-md"
                />
                <div class="px-4 pb-4">
                  <p class="mt-2 text-lg font-semibold">
                    Baydle Game
                  </p>
                  <p>
                    A Bay School themed Wordle game. Guess the teacher (that taught in 2024) in ten tries or less based on their room number and subject.
                  </p>
                </div>
              </div>
            </a>
          </div>
          <div class="flex w-full p-2 md:w-1/3 md:flex-col">
            <NuxtLink to="/schedule">
              <div class="rounded-md ring-4 ring-gray-200 transition duration-300 ease-in-out hover:ring-blue-400">
                <NuxtImg
                  quality="80"
                  format="webp"
                  loading="lazy"
                  src="/schedule.jpg"
                  alt="Baydle Game"
                  class="w-full rounded-t-md"
                />
                <div class="px-4 pb-4">
                  <p class="mt-2 text-lg font-semibold">
                    Schedule Generator
                  </p>
                  <p>
                    Generate a printable schedule based on the current week's schedule or the default schedule.
                  </p>
                </div>
              </div>
            </NuxtLink>
          </div>
          <div class="flex w-full p-2 md:w-1/3 md:flex-col">
            <a
              href="https://study.lucaskchang.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="rounded-md ring-4 ring-gray-200 transition duration-300 ease-in-out hover:ring-blue-400">
                <NuxtImg
                  quality="80"
                  format="webp"
                  loading="lazy"
                  src="/study.jpg"
                  alt="Baydle Game"
                  class="w-full rounded-t-md"
                />
                <div class="px-4 pb-4">
                  <p class="mt-2 text-lg font-semibold">
                    Homework Timer
                  </p>
                  <p>
                    Time your homework sessions using the classic pomodoro technique or your own custom interval.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const isCreditsOpen = ref(false);
const isToolsOpen = ref(false);
</script>
