<script>
export default {
  name: 'HeaderNavigation',
  data() {
    return {
      subNavOpen: false,
    }
  },
  computed: {
    auth() {
      return this.$auth
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
      if (this.$route.path !== '/') {
        this.$router.push({ name: 'index' })
      }
    },
  },
}
</script>

<template>
  <header
    class="w-full p-3 flex flex-row items-start justify-between"
    :class="$auth.loggedIn ? 'border-theme-border' : 'border-transparent'"
  >
    <nav class="flex flex-row items-center space-x-4">
      <Keycap
        :theme="
          $route.name === 'index' || $route.name === 'Dashboard'
            ? 'accent'
            : 'alpha'
        "
        text-size="large"
        @click.native="
          $auth.loggedIn ? $router.push('/dashboard') : $router.push('/')
        "
      >
        K
        <span class="hidden">eebhoarder</span>
      </Keycap>
      <nuxt-link
        v-show="$auth.loggedIn"
        :to="{ name: 'lists' }"
        :class="$route.name.includes('lists') ? 'underline' : ''"
        class="p-3 text-theme-text hover:text-theme-text-d"
      >
        Lists
      </nuxt-link>
      <nuxt-link
        v-show="$auth.loggedIn"
        :to="{ name: 'items' }"
        :class="$route.name.includes('items') ? 'underline' : ''"
        class="p-3 text-theme-text hover:text-theme-text-d"
      >
        Items
      </nuxt-link>
      <!-- <nuxt-link
        v-show="$auth.loggedIn"
        :to="{ name: 'photos' }"
        :class="$route.name.includes('photos') ? 'underline' : ''"
        class="p-3 text-theme-text hover:text-theme-text-d"
      >
        Photos
      </nuxt-link> -->
    </nav>
    <section v-if="$auth.loggedIn" class="flex flex-row">
      <Keycap
        v-if="!subNavOpen"
        cap-style="large"
        theme="accent"
        class="ml-2"
        @click.native="subNavOpen = true"
      >
        {{ $auth.user?.profile?.name || $auth.user?.email || 'Settings' }}
      </Keycap>
      <template v-else>
        <nuxt-link :to="{ name: 'profile' }">
          <Keycap cap-style="large" class="ml-2">Profile</Keycap>
        </nuxt-link>
        <Keycap cap-style="large" class="ml-2" @click.native="logout">
          Log Out
        </Keycap>
        <Keycap
          theme="mod"
          cap-style="large"
          class="ml-2"
          @click.native="$showModal('ThemeModal')"
        >
          Swap Keycaps
        </Keycap>
        <Keycap theme="accent" class="ml-6" @click.native="subNavOpen = false">
          Esc
        </Keycap>
      </template>
    </section>
    <section v-else class="flex flex-row">
      <Keycap
        cap-style="large"
        class="ml-2"
        theme="accent"
        @click.native="
          $showModal('LoginRegisterModal', { props: { authType: 'login' } })
        "
      >
        Log In
      </Keycap>
    </section>
  </header>
</template>
