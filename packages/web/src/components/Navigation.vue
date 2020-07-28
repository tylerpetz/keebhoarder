<script>
export default {
  name: 'Navigation',
  data () {
    return {
      subNavOpen: false
    }
  }
}
</script>

<template>
  <header class="w-full p-2 flex flex-row items-start justify-between z-30">
    <div class="flex flex-row">
      <h1>
        <keycap theme="accent" textSize="large" @click.native="$router.push({ name: 'Home' })">K<span class="hidden">eeb</span>h<span class="hidden">oarder</span></keycap>
      </h1>
      <keycap capStyle="large" class="ml-6">Inventory</keycap>
      <keycap capStyle="large" class="ml-2">Orders</keycap>
      <keycap capStyle="large" class="ml-2">Builds</keycap>
      <!-- <keycap capStyle="large" class="ml-2">Artisan Box</keycap>
      <span class="block h-12 w-1 bg-theme-bg ml-2" />
      <keycap capStyle="large" class="ml-2">Marketplace</keycap>
      <keycap capStyle="large" class="ml-2">Tools</keycap>
      <keycap capStyle="large" class="ml-2">Resources</keycap> -->
    </div>
    <div class="flex flex-row">
      <template v-if="!subNavOpen">
        <keycap theme="mod" capStyle="large" @click.native="$store.commit('SET_ACTIVE_MODAL', 'theme')">Swap Keycaps</keycap>
        <keycap capStyle="large" theme="accent" @click.native="subNavOpen = true" class="ml-2">username</keycap>
      </template>
      <template v-else>
        <keycap capStyle="large" class="ml-2">Profile</keycap>
        <keycap capStyle="large" class="ml-2">Settings</keycap>
        <keycap capStyle="large" theme="mod" class="ml-2">Log Out</keycap>
        <keycap @click.native="subNavOpen = false" theme="accent" class="ml-6">Esc</keycap>
      </template>
      <!-- <template v-if="!$store.getters.loggedIn">
        <keycap theme="base" capStyle="large" @click.native="$store.commit('SET_ACTIVE_MODAL', 'register')">Register</keycap>
        <keycap theme="mod" capStyle="large" @click.native="$store.commit('SET_ACTIVE_MODAL', 'login')" class="ml-2">Log In</keycap>
      </template>
      <template v-else>
        <keycap theme="mod" type="auto" @click.native="$store.commit('LOG_OUT')">Log Out</keycap>
      </template> -->
    </div>
  </header>
</template>
