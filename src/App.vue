<script>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
import AuthForm from '@/components/AuthForm.vue'
import SwapCaps from '@/components/SwapCaps.vue'
import CreateCapSet from '@/components/CreateCapSet.vue'
// import ItemModal from '@/components/ItemModal.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
    AuthForm,
    SwapCaps,
    CreateCapSet
    // ItemModal
  },
  computed: {
    activeModal: {
      get () {
        return this.$store.state.app.activeModal
      },
      set (modal) {
        this.$store.commit('app/SET_ACTIVE_MODAL', modal)
      }
    },
    themeFavicon () {
      return `favicon-${this.$store.state.app.activeTheme.id}.svg`
    }
  },
  mounted () {
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
    <AuthForm
      :show="activeModal === 'register' || activeModal === 'login'"
      :auth-type="activeModal || ''"
      @close="activeModal = ''"
    />
    <SwapCaps
      :show="activeModal === 'theme'"
      @close="activeModal = false"
      @change-themes="changeThemes"
    />
    <CreateCapSet
      :show="activeModal === 'create'"
      @close="activeModal = false"
    />
    <!-- <ItemModal /> -->
  </main>
</template>
