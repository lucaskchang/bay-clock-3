<template :class="$colorMode.value">
  <div
    class="min-h-screen p-2 text-gray-950 transition duration-300 ease-linear dark:bg-gray-950 dark:text-white"
  >
    <slot />
    <Footer />
  </div>
</template>
