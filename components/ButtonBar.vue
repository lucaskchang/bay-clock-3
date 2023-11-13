<template>
  <div class="flex flex-wrap justify-between px-2 lg:px-8">
    <div class="flex flex-wrap">
      <UsefulLinks />
      <LunchMenu />
      <CustomSchedule />
      <Styles />
    </div>
    <div class="flex flex-col space-x-2">
      <WeeklySchedule />
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: figure out how to have tailwind detect styles from json
const styles = {
  base: 'm-1',
  rounded: 'rounded-full',
  padding: { sm: 'px-4 py-2' },
  size: { sm: 'text-sm' },
};
</script>
