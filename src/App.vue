<script>
import Vue from 'vue'
import HeaderNavigation from '@/components/HeaderNavigation.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SystemMessages from '@/components/SystemMessage.vue'
import ModalList from '@/modals/index.js'
import { MessageProvider, ModalProvider } from '@/compositions'

export default {
  name: 'App',
  components: {
    HeaderNavigation,
    ModalList,
    SiteFooter,
    SystemMessages
  },
  data () {
    return {
      MessageProvider,
      ModalProvider
    }
  },
  computed: {
    themeFavicon () {
      return `favicon-${this.$store.state.app.activeTheme.id}.svg`
    }
  },
  created () {
    this.setupApp()
  },
  mounted () {
    this.$store.dispatch('auth/attemptLogin')
    if (this.$store.getters['auth/currentUser'] && this.$store.getters['auth/currentUser'].profile.theme) {
      this.changeThemes({ id: this.$store.getters['auth/currentUser'].profile.theme })
    } else if (window.localStorage && localStorage.getItem('activeTheme') && JSON.parse(localStorage.getItem('activeTheme'))) {
      this.changeThemes(JSON.parse(localStorage.getItem('activeTheme')))
    }
  },
  methods: {
    setupApp () {
      Vue.prototype.$showModal = this.ModalProvider.showModal
      Vue.prototype.$closeModal = this.ModalProvider.closeModal
      Vue.prototype.$currentModal = this.ModalProvider.getModal.value
      Vue.prototype.$showMessage = this.MessageProvider.showMessage
      Vue.prototype.$closeMessage = this.MessageProvider.closeMessage
      Vue.prototype.$getMessages = this.MessageProvider.getMessages.value
      Vue.axios.interceptors.response.use(null,
        (error) => {
          if (error.response && error.response.status === 401) {
            this.$store.dispatch('auth/refreshTokens')
          }
          return Promise.reject(error)
        })
    },
    changeThemes (theme) {
      this.$store.commit('app/SET_ACTIVE_THEME', theme)

      const favicon = document.getElementById('favicon')
      favicon.href = this.themeFavicon
    }
  }
}
</script>

<template>
  <main
    :class="`theme-${$store.state.app.activeTheme.id}`"
    class="keebhoarder-theme bg-theme-bg font-body tracking-wider w-full h-screen overflow-y-scroll bg-caps flex flex-col pr-1 justify-between items-center relative scrollbar-thin scrollbar-track-accent-legend scrollbar-thumb-accent-cap hover:scrollbar-thumb-accent-cap-hover"
  >
    <header-navigation />
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view
        class="w-full flex-grow"
      />
    </transition>
    <site-footer />
    <modal-list />
    <system-messages />
  </main>
</template>
