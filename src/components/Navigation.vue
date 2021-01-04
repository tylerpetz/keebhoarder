<script>
export default {
  name: 'Navigation',
  data () {
    return {
      subNavOpen: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<template>
  <header
    class="w-full p-3 flex flex-row items-start justify-between"
    :class="$store.getters.loggedIn ? 'border-theme-border' : 'border-transparent'"
  >
    <div class="flex flex-row">
      <h1 class="mr-4">
        <router-link :to="{ name: 'Home' }">
          <Keycap
            :theme="$route.name === 'Home' || $route.name === 'Dashboard' ? 'accent' : 'alpha'"
            text-size="large"
          >
            K<span class="hidden">eebhoarder</span>
          </Keycap>
        </router-link>
      </h1>
    </div>
    <div class="flex flex-row">
      <template v-if="$store.getters.loggedIn">
        <Keycap
          v-if="!subNavOpen"
          cap-style="large"
          theme="accent"
          class="ml-2"
          @click.native="subNavOpen = true"
        >
          username
        </Keycap>
        <template v-else>
          <Keycap
            cap-style="large"
            class="ml-2"
          >
            Profile
          </Keycap>
          <Keycap
            cap-style="large"
            class="ml-2"
          >
            Settings
          </Keycap>
          <Keycap
            theme="mod"
            cap-style="large"
            class="ml-2"
            @click.native="$store.commit('app/SET_ACTIVE_MODAL', 'theme')"
          >
            Swap Keycaps
          </Keycap>
          <Keycap
            cap-style="large"
            theme="mod"
            class="ml-2"
            @click.native="logout"
          >
            Log Out
          </Keycap>
          <Keycap
            theme="accent"
            class="ml-6"
            @click.native="subNavOpen = false"
          >
            Esc
          </Keycap>
        </template>
      </template>
      <template v-else>
        <Keycap
          cap-style="large"
          class="ml-2"
          theme="mod"
          @click.native="$store.commit('app/SET_ACTIVE_MODAL', 'register')"
        >
          Join
        </Keycap>
        <Keycap
          cap-style="large"
          class="ml-2"
          theme="accent"
          @click.native="$store.commit('app/SET_ACTIVE_MODAL', 'login')"
        >
          Log In
        </Keycap>
      </template>
    </div>
  </header>
</template>
