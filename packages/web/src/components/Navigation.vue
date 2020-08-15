<script>
export default {
  name: 'Navigation',
  data () {
    return {
      subNavOpen: false
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
  <header class="w-full p-2 flex flex-row items-start justify-between">
    <div class="flex flex-row">
      <h1 class="mr-4">
        <Keycap :theme="routeName === 'Home' || routeName === 'Dashboard' ? 'accent' : 'alpha'" text-size="large" @click.native="$router.push({ name: 'Dashboard' })">K<span class="hidden">eeb</span>h<span class="hidden">oarder</span></Keycap>
      </h1>
      <template v-for="route in ['Inventory', 'Orders', 'Builds']">
        <Keycap :key="route" @click.native="$router.push({ name: route })" cap-style="large" class="ml-2" :theme="routeName === route ? 'mod' : 'alpha'">{{ route }}</Keycap>
      </template>
      <!-- <Keycap cap-style="large" class="ml-2">Artisan Box</Keycap>
      <span class="block h-12 w-1 bg-theme-bg ml-2" />
      <Keycap cap-style="large" class="ml-2">Marketplace</Keycap>
      <Keycap cap-style="large" class="ml-2">Tools</Keycap>
      <Keycap cap-style="large" class="ml-2">Resources</Keycap> -->
    </div>
    <div class="flex flex-row">
      <!-- <Keycap theme="mod" cap-style="large" @click.native="$store.commit('SET_ACTIVE_MODAL', 'create')">Create</Keycap> -->
      <Keycap theme="mod" cap-style="large" @click.native="$store.commit('SET_ACTIVE_MODAL', 'theme')" class="ml-2">Swap Keycaps</Keycap>
      <template v-if="$store.getters.loggedIn">
        <Keycap v-if="!subNavOpen" cap-style="large" theme="accent" @click.native="subNavOpen = true" class="ml-2">username</Keycap>
        <template v-else>
          <Keycap cap-style="large" class="ml-2">Profile</Keycap>
          <Keycap cap-style="large" class="ml-2">Settings</Keycap>
          <Keycap @click.native="$store.dispatch('logout')" cap-style="large" theme="mod" class="ml-2">Log Out</Keycap>
          <Keycap @click.native="subNavOpen = false" theme="accent" class="ml-6">Esc</Keycap>
        </template>
      </template>
      <template v-else>
        <Keycap cap-style="large" class="ml-2" @click.native="$store.commit('SET_ACTIVE_MODAL', 'register')">Register</Keycap>
        <Keycap cap-style="large" class="ml-2" @click.native="$store.commit('SET_ACTIVE_MODAL', 'login')">Log In</Keycap>
      </template>
    </div>
  </header>
</template>
