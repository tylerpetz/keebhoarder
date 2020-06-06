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
  <header class="w-full absolute top-0 left-0 right-0 p-4 flex justify-between z-30">
    <h1 class="text-log text-theme-text font-bold">Keebhoarder</h1>
    <div v-if="!loggedIn">
      <Keycap @click.native="$emit('change', 'register')">Register</Keycap>
      <Keycap theme="accent" @click.native="$emit('change', 'login')">Log In</Keycap>
    </div>
    <template v-else>
      <Keycap theme="mod" @click.native="$emit('change', 'logout')">Log Out</Keycap>
    </template>
  </header>
</template>
