<script>
export default {
  name: 'Navigation',
  data () {
    return {
      subNavOpen: false
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<template>
  <header
    class="w-full p-3 flex flex-row items-start justify-between"
    :class="$store.getters['auth/loggedIn'] ? 'border-theme-border' : 'border-transparent'"
  >
    <div class="flex flex-row items-center space-x-4">
      <h1 class="mr-2">
        <router-link :to="{ name: 'Home' }">
          <Keycap
            :theme="$route.name === 'Home' || $route.name === 'Dashboard' ? 'accent' : 'alpha'"
            text-size="large"
          >
            K<span class="hidden">eebhoarder</span>
          </Keycap>
        </router-link>
      </h1>
      <template v-if="$store.getters['auth/loggedIn']">
        <router-link
          :to="{ name: 'Lists' }"
          :class="$route.name === 'Lists' ? 'underline' : ''"
          class="p-3 text-theme-text hover:text-theme-text-d"
        >
          Lists
        </router-link>
        <router-link
          :to="{ name: 'Items' }"
          :class="$route.name === 'Items' ? 'underline' : ''"
          class="p-3 text-theme-text hover:text-theme-text-d"
        >
          Items
        </router-link>
      </template>
    </div>
    <div class="flex flex-row">
      <template v-if="$store.getters['auth/loggedIn']">
        <Keycap
          v-if="!subNavOpen"
          cap-style="large"
          theme="accent"
          class="ml-2"
          @click.native="subNavOpen = true"
        >
          {{ $store.getters['auth/currentUser'].username }}
        </Keycap>
        <template v-else>
          <!-- <Keycap
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
          </Keycap> -->
          <Keycap
            theme="mod"
            cap-style="large"
            class="ml-2"
            @click.native="$showModal('ThemeModal')"
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
          theme="accent"
          @click.native="$showModal('AuthModal', { props: { authType: 'login' }})"
        >
          Log In
        </Keycap>
      </template>
    </div>
  </header>
</template>
