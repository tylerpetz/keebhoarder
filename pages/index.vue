<script>
export default {
  name: 'Index',
  created() {
    if (this.$auth.loggedIn) {
      this.$router.replace('/dashboard')
    }
  },
}
</script>

<template>
  <div class="flex justify-center items-center flex-col h-[600px]">
    <h1 class="text-theme-text text-xl md:text-3xl font-extrabold">
      Keebhoarder
      <span class="blink font-normal">|</span>
    </h1>
    <h2 class="text-theme-text-l md:text-lg font-semibold">
      manage and share your mechanical keyboard collection
    </h2>
    <div class="flex my-6 space-x-6">
      <Keycap
        theme="mod"
        cap-style="large"
        data-test="welcome-swap-keycaps"
        @click.native="$showModal('ThemeModal')"
      >
        Swap Keycaps
      </Keycap>
      <Keycap
        cap-style="large"
        theme="accent"
        @click.native="
          $showModal('LoginRegisterModal', { props: { authType: 'register' } })
        "
      >
        Create an Account
      </Keycap>
    </div>
  </div>
</template>

<style lang="css" scoped>
.blink {
  animation: 1s blink step-end infinite;
}

@keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: inherit;
  }
}
</style>
