<script>
export default {
  name: 'Navigation'
}
</script>

<template>
  <header class="w-full p-2 flex flex-row items-start justify-between z-30">
    <div class="flex flex-row">
      <h1>
        <Keycap theme="accent" textSize="large" @click.native="$router.push({ name: 'Home' })">K<span class="hidden">eeb</span>h<span class="hidden">oarder</span></Keycap>
      </h1>
      <keycap textSize="large" capStyle="large" class="ml-6">Inventory</keycap>
      <keycap textSize="large" capStyle="large" class="ml-2">Orders</keycap>
      <keycap textSize="large" capStyle="large" class="ml-2">Builds</keycap>
      <span class="block h-12 w-1 bg-theme-bg ml-2" />
      <keycap textSize="large" capStyle="large" class="ml-2">Marketplace</keycap>
      <keycap textSize="large" capStyle="large" class="ml-2">Artisan Box</keycap>
      <keycap textSize="large" capStyle="large" class="ml-2">Tools</keycap>
      <keycap textSize="large" capStyle="large" class="ml-2">Resources</keycap>
    </div>
    <div class="flex flex-row">
      <keycap textSize="large" capStyle="large" theme="mod">username</keycap>
      <!-- <template v-if="!$store.getters.loggedIn">
        <Keycap theme="base" capStyle="large" @click.native="$store.commit('SET_ACTIVE_MODAL', 'register')">Register</Keycap>
        <Keycap theme="mod" capStyle="large" @click.native="$store.commit('SET_ACTIVE_MODAL', 'login')" class="ml-2">Log In</Keycap>
      </template>
      <template v-else>
        <Keycap theme="mod" type="auto" @click.native="$store.commit('LOG_OUT')">Log Out</Keycap>
      </template> -->
    </div>
  </header>
</template>
