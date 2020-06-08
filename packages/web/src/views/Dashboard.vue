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
  <div>
    <WelcomeScreen v-if="$store.getters.loggedIn" />
    <div class="flex flex-row items-center justify-center" v-else>
      <div
        class="flex items-center justify-center w-64 h-64 rounded-lg bg-theme-bg-alt m-4 border-4 border-transparent hover:border-theme-border cursor-pointer"
        @click="$router.push({ name: 'Inventory' })"
       >
        <h2 class="text-theme-link text-2xl">Inventory</h2>
      </div>
      <div
        class="flex items-center justify-center w-64 h-64 rounded-lg bg-theme-bg-alt m-4 border-4 border-transparent hover:border-theme-border cursor-pointer"
        @click="$router.push({ name: 'Builds' })"
      >
        <h2 class="text-theme-link text-2xl">Builds</h2>
      </div>
      <div
        class="flex items-center justify-center w-64 h-64 rounded-lg bg-theme-bg-alt m-4 border-4 border-transparent hover:border-theme-border cursor-pointer"
        @click="$router.push({ name: 'Settings' })"
      >
        <h2 class="text-theme-link text-2xl">Settings</h2>
      </div>
    </div>
  </div>
</template>
