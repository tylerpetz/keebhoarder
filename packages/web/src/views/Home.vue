<script>
import WelcomeScreen from '@/components/WelcomeScreen'
import Dashboard from '@/components/Dashboard'

export default {
  name: 'Home',
  components: {
    Dashboard,
    WelcomeScreen
  }
}
</script>

<template>
  <WelcomeScreen v-if="!loggedIn" />
  <Dashboard v-else />
</template>
