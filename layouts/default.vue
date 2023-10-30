<template :class="$colorMode.value">
  <div class="min-h-screen dark:bg-gray-950 dark:text-white">
    <slot />
    <FooterComponent />
  </div>
</template>
