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
  computed: {
    themeFavicon() {
      return `favicon-${this.$store.state.app.activeTheme.id}.svg`
    },
  },
  created() {
    this.$store.dispatch('auth/initSupabase')
  },
  mounted() {
    this.setupApp()
    //   if (
    //     this.$store.getters['auth/currentUser'] &&
    //     this.$store.getters['auth/currentUser'].profile.theme
    //   ) {
    //     this.changeThemes({
    //       id: this.$store.getters['auth/currentUser'].profile.theme,
    //     })
    //   } else
    if (
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
    :class="`theme-${$store.state.app.activeTheme.id}`"
    class="
      keebhoarder-theme
      bg-theme-bg
      font-body
      tracking-wider
      w-full
      h-screen
      overflow-y-scroll
      bg-caps
      flex flex-col
      pr-1
      justify-between
      items-center
      relative
      scrollbar-thin scrollbar-track-accent-legend scrollbar-thumb-accent-cap
      hover:scrollbar-thumb-accent-cap-hover
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
