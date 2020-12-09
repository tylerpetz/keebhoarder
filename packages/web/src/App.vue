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
        return this.$store.state.activeModal
      },
      set (modal = false) {
        this.$store.commit('SET_ACTIVE_MODAL', modal)
      }
    }
  },
  created () {
    this.checkAuthState()
  },
  mounted () {
    if (window.localStorage && localStorage.getItem('activeTheme') && JSON.parse(localStorage.getItem('activeTheme'))) {
      console.log('hi')
      this.$store.commit('SET_ACTIVE_THEME', JSON.parse(localStorage.getItem('activeTheme')))
    }
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
    :class="`theme-${$store.state.activeTheme.id}`"
    class="keebhoarder-theme bg-theme-bg font-body tracking-wider min-w-screen min-h-screen w-screen bg-caps flex flex-col justify-between items-center relative"
  >
    <Navigation />
    <router-view class="w-full flex-grow" />
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
