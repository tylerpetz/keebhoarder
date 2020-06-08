<script>
export default {
  name: 'Navigation',
  props: {
    loggedIn: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <header class="w-full absolute top-0 left-0 right-0 p-4 flex flex-row items-start justify-between z-30">
    <h1>
      <Keycap theme="accent" type="large">Kh</Keycap>
    </h1>
    <div class="flex flex-row" v-if="!loggedIn">
      <Keycap theme="base" type="auto" @click.native="$store.commit('SET_ACTIVE_MODAL', 'register')">Register</Keycap>
      <Keycap theme="accent" type="auto" @click.native="$store.commit('SET_ACTIVE_MODAL', 'login')">Log In</Keycap>
    </div>
    <template v-else>
      <Keycap theme="mod" @click.native="$store.commit('LOG_OUT')">Log Out</Keycap>
    </template>
  </header>
</template>
