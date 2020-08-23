<script>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
// import Utilities from '@/components/Utilities.vue'
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
    // Utilities
  },
  computed: {
    activeModal: {
      get () {
        return this.$store.state.activeModal
      },
      set (modal = false) {
        this.$store.commit('SET_ACTIVE_MODAL', modal)
      }
    },
    containerClass () {
      // purgeable css classes
      const { activeTheme = '' } = this.$store.state
      if (activeTheme === '8008') return 'theme-8008'
      if (activeTheme === '9009') return 'theme-9009'
      if (activeTheme === 'dolch') return 'theme-dolch'
      if (activeTheme === 'milkshake') return 'theme-milkshake'
      if (activeTheme === 'oblivion') return 'theme-oblivion'
      if (activeTheme === 'laser') return 'theme-laser'
      if (activeTheme === 'bento') return 'theme-bento'
      if (activeTheme === 'metropolis') return 'theme-metropolis'
      if (activeTheme === 'wavez') return 'theme-wavez'

      return 'theme-milkshake'
    }
  },
  created () {
    this.checkAuthState()
  },
  methods: {
    checkAuthState () {
      const token = localStorage.getItem('token')
      if (!token) return
      this.$store.commit('SET_USER_TOKEN', token)
    }
  }
}
</script>

<template>
  <main
    :class="containerClass"
    class="keebhoarder-theme bg-theme-bg font-body tracking-wider min-w-screen min-h-screen w-screen bg-caps flex flex-col justify-between items-center relative"
  >
    <Navigation />
    <router-view />
    <Footer />
    <AuthForm
      :show="activeModal === 'register' || activeModal === 'login'"
      :auth-type="activeModal || ''"
      @close="activeModal = false"
    />
    <SwapCaps
      :show="activeModal === 'theme'"
      @close="activeModal = false"
    />
    <CreateCapSet
      :show="activeModal === 'create'"
      @close="activeModal = false"
    />
    <!-- <ItemModal /> -->
  </main>
</template>
