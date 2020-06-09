<script>
export default {
  name: 'WelcomeScreen'
}
</script>

<template>
  <div class="flex justify-center items-center flex-col h-full">
    <h1 class="text-theme-text text-4xl font-extrabold">Keebhoarder<span class="blink font-normal">|</span></h1>
    <h2 class="text-theme-text-alt text-lg font-semibold">securely manage your keyboard habit</h2>
  </div>
</template>

<style lang="css" scoped>
.blink {
  animation: 1s blink step-end infinite;
}

@keyframes blink {
  from, to {
    color: transparent;
  }
  50% {
    color: inherit;
  }
}
</style>
