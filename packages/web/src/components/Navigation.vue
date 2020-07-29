<script>
export default {
  name: 'Navigation',
  data () {
    return {
      subNavOpen: false,
      loggedIn: false
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    }
  }
}
</script>

<template>
  <header class="w-full p-2 flex flex-row items-start justify-between z-30">
    <div class="flex flex-row">
      <h1 class="mr-4">
        <keycap :theme="routeName === 'Home' || routeName === 'Dashboard' ? 'accent' : 'alpha'" textSize="large" @click.native="$router.push({ name: 'Dashboard' })">K<span class="hidden">eeb</span>h<span class="hidden">oarder</span></keycap>
      </h1>
      <template v-for="route in ['Inventory', 'Orders', 'Builds']">
        <keycap :key="route" @click.native="$router.push({ name: route })" capStyle="large" class="ml-2" :theme="routeName === route ? 'mod' : 'alpha'">{{ route }}</keycap>
      </template>
      <!-- <keycap capStyle="large" class="ml-2">Artisan Box</keycap>
      <span class="block h-12 w-1 bg-theme-bg ml-2" />
      <keycap capStyle="large" class="ml-2">Marketplace</keycap>
      <keycap capStyle="large" class="ml-2">Tools</keycap>
      <keycap capStyle="large" class="ml-2">Resources</keycap> -->
    </div>
    <div class="flex flex-row">
      <keycap theme="mod" capStyle="large" @click.native="$store.commit('SET_ACTIVE_MODAL', 'theme')">Swap Keycaps</keycap>
      <template v-if="loggedIn">
        <keycap v-if="!subNavOpen" capStyle="large" theme="accent" @click.native="subNavOpen = true" class="ml-2">username</keycap>
        <template v-else>
          <keycap capStyle="large" class="ml-2">Profile</keycap>
          <keycap capStyle="large" class="ml-2">Settings</keycap>
          <keycap capStyle="large" theme="mod" class="ml-2">Log Out</keycap>
          <keycap @click.native="subNavOpen = false" theme="accent" class="ml-6">Esc</keycap>
        </template>
      </template>
      <template v-else>
        <keycap capStyle="large" class="ml-2" @click.native="$store.commit('SET_ACTIVE_MODAL', 'register')">Register</keycap>
        <keycap capStyle="large" class="ml-2" @click.native="$store.commit('SET_ACTIVE_MODAL', 'login')">Log In</keycap>
      </template>
    </div>
  </header>
</template>
