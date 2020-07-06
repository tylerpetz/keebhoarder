<script>
import WelcomeScreen from '@/components/WelcomeScreen'

export default {
  name: 'Dashboard',
  components: {
    WelcomeScreen
  }
}
</script>

<template>
  <div class="flex flex-row items-center justify-center h-full">
    <WelcomeScreen v-if="$store.getters.loggedIn" />
    <div class="flex flex-row" v-else>

    </div>
  </div>
</template>
