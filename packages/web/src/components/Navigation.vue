<script>
export default {
  name: 'Navigation'
}
</script>

<template>
  <header class="w-full p-2 flex flex-row items-start justify-between z-30">
    <h1>
      <Keycap theme="accent" textSize="large" @click.native="$router.push({ name: 'Dashboard' })">K<span class="hidden">eeb</span>h<span class="hidden">oarder</span></Keycap>
    </h1>
    <div class="flex flex-row">
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
