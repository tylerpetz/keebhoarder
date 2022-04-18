<script>
import Vue from 'vue'
import ModalList from '@/modals/index.js'
import { MessageProvider, ModalProvider } from '@/compositions'

export default {
  name: 'App',
  components: {
    ModalList,
  },
  data() {
    return {
      MessageProvider,
      ModalProvider,
    }
  },
  head() {
    return {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: this.$store.getters['app/themeFavicon'],
          id: 'favicon',
          hid: 'favicon',
        },
      ],
      bodyAttrs: {
        class: `scrollbar-thin scrollbar-track-theme-bg-d scrollbar-thumb-theme-link hover:scrollbar-thumb-theme-link-hover theme-${this.$store.state.app.activeTheme.id}`,
      },
    }
  },
  async mounted() {
    this.setupApp()

    if (this.$store.getters['auth/loggedIn']) {
      await this.$store.dispatch('auth/getUserProfile')
    }
    if (this.$auth.user.profile?.theme) {
      this.$store.dispatch('app/changeThemes', {
        id: this.$auth.user.profile.theme,
      })
    } else if (
      window.localStorage &&
      localStorage.getItem('activeTheme') &&
      JSON.parse(localStorage.getItem('activeTheme'))
    ) {
      this.$store.dispatch(
        'app/changeThemes',
        JSON.parse(localStorage.getItem('activeTheme'))
      )
    }
  },
  methods: {
    setupApp() {
      Vue.prototype.$showModal = this.ModalProvider.showModal
      Vue.prototype.$closeModal = this.ModalProvider.closeModal
      Vue.prototype.$currentModal = this.ModalProvider.getModal.value
      Vue.prototype.$showMessage = this.MessageProvider.showMessage
      Vue.prototype.$closeMessage = this.MessageProvider.closeMessage
      Vue.prototype.$getMessages = this.MessageProvider.getMessages.value
    },
  },
}
</script>

<template>
  <main
    class="
      keebhoarder-theme
      bg-theme-bg
      font-body
      tracking-wider
      w-full
      min-h-screen
      h-full
      bg-caps
      flex flex-col
      pr-1
      justify-between
      items-center
      relative
    "
  >
    <lazy-header-navigation />
    <transition name="fade" mode="out-in">
      <Nuxt class="w-full flex-grow" />
    </transition>
    <site-footer />
    <modal-list />
    <system-messages />
  </main>
</template>
