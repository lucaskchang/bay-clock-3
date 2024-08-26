<template>
  <div class="flex h-screen flex-col items-center justify-center space-y-4 p-4 text-center">
    <p class="text-5xl font-bold md:text-8xl">
      Page not found
    </p>
    <p class="text-xl font-semibold md:text-3xl">
      Uh oh, we can't find the page you're looking for. If you think this is a mistake, please fill out
      <a
        href="https://forms.gle/khAXGXiUMoAoskKQA"
        target="_blank"
        class="font-semibold text-blue-400 hover:text-blue-500"
        rel="noopener noreferrer"
      >
        this form
      </a> or email lucaskchang@gmail.com.
    </p>
    <UButton
      size="lg"
      to="/"
    >
      Back to home
    </UButton>
  </div>
</template>
