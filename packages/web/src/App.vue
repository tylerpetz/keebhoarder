<script>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
import Modals from '@/components/Modals.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
    Modals
  },
  data () {
    return {
      theme: 'wavez',
      swapCaps: [
        {
          text: 'Alt',
          type: 'mod',
          theme: 'mod'
        },
        {
          text: 'K'
        }
      ]
    }
  },
  mounted () {
    this.checkAuthState()
  },
  computed: {
    containerClass () {
      // purgeable css classes
      if (this.theme === '8008') return 'theme-8008'
      if (this.theme === '9009') return 'theme-9009'
      if (this.theme === 'dolch') return 'theme-dolch'
      if (this.theme === 'milkshake') return 'theme-milkshake'
      if (this.theme === 'oblivion') return 'theme-oblivion'
      if (this.theme === 'laser') return 'theme-laser'
      if (this.theme === 'bento') return 'theme-bento'

      return 'theme-wavez'
    },
    keymap () {
      return {
        'alt+r': 'register',
        'alt+l': 'login',
        'alt+k': 'keycaps',
        'alt+n': 'newtheme'
      }
    }
  },
  methods: {
    checkAuthState () {
      const authState = !!localStorage.getItem('loggedin')
      this.loggedIn = authState
    },
    changeNavigation (type) {
      // if (type === 'register') {
      //   this.activeModal = 'register'
      // } else if (type === 'login') {
      //   this.activeModal = 'login'
      // } else {
      //   this.activeModal = false
      // }
    },
    closeModal () {
      // if (this.activeModal) {
      //   this.activeModal = false
      // }
    }
  }
}
</script>

<template>
  <main
    :class="containerClass"
    class="keebhoarder-theme bg-theme-bg font-body tracking-wider min-w-screen min-h-screen h-screen w-screen bg-caps flex flex-col items-center justify-center relative"
    @keydown.esc="closeModal"
  >
    <Navigation @change="changeNavigation" :loggedIn="loggedIn" />
    <section class="relative z-10 w-full px-8">
      <router-view />
    </section>
    <Footer />
    <Modals />
  </main>
</template>

<style lang="scss">
@import "./assets/themes.scss";
</style>
