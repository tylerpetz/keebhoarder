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
    },
    routes () {
      if (this.$store.getters.loggedIn) {
        return ['Inventory', 'Orders', 'Builds']
      }
      return []
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
  <header class="w-full p-2 flex flex-row items-start justify-between">
    <div class="flex flex-row">
      <h1 class="mr-4">
        <router-link :to="{ name: 'Home' }">
          <Keycap
            :theme="routeName === 'Home' || routeName === 'Dashboard' ? 'accent' : 'alpha'"
            text-size="large"
          >
            K<span class="hidden">eeb</span>h<span class="hidden">oarder</span>
          </Keycap>
        </router-link>
      </h1>
      <template v-for="route in routes">
        <router-link
          :key="route"
          :to="{ name: route }"
        >
          <Keycap
            cap-style="large"
            class="ml-2"
            :theme="routeName === route ? 'mod' : 'alpha'"
          >
            {{ route }}
          </Keycap>
        </router-link>
      </template>
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
            @click.native="$store.commit('SET_ACTIVE_MODAL', 'theme')"
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
          @click.native="$store.commit('SET_ACTIVE_MODAL', 'register')"
        >
          Join
        </Keycap>
        <Keycap
          cap-style="large"
          class="ml-2"
          theme="accent"
          @click.native="$store.commit('SET_ACTIVE_MODAL', 'login')"
        >
          Log In
        </Keycap>
      </template>
    </div>
  </header>
</template>
