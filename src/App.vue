<script>
import Vue from 'vue'
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
import ModalList from './modals/index.js'
import { ModalProvider } from './modals/modal-provider.js'

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
    ModalList
  },
  data () {
    return {
      ModalProvider
    }
  },
  computed: {
    themeFavicon () {
      return `favicon-${this.$store.state.app.activeTheme.id}.svg`
    }
  },
  mounted () {
    Vue.prototype.$showModal = this.ModalProvider.showModal
    Vue.prototype.$closeModal = this.ModalProvider.closeModal
    Vue.prototype.$currentModal = this.ModalProvider.getModal.value
    this.$store.dispatch('auth/attemptLogin')
    if (window.localStorage && localStorage.getItem('activeTheme') && JSON.parse(localStorage.getItem('activeTheme'))) {
      this.changeThemes(JSON.parse(localStorage.getItem('activeTheme')))
    }
  },
  methods: {
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
    <Navigation />
    <router-view
      class="w-full flex-grow"
    />
    <Footer />
    <ModalList />
  </main>
</template>
