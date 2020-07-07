<script>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
import Utilities from '@/components/Utilities.vue'

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
    Utilities
  },
  data () {
    return {
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
    // this.checkAuthState()
  },
  computed: {
    containerClass () {
      // purgeable css classes
      const { activeTheme = '' } = this.$store.getters
      if (activeTheme === '8008') return 'theme-8008'
      if (activeTheme === '9009') return 'theme-9009'
      if (activeTheme === 'dolch') return 'theme-dolch'
      if (activeTheme === 'milkshake') return 'theme-milkshake'
      if (activeTheme === 'oblivion') return 'theme-oblivion'
      if (activeTheme === 'laser') return 'theme-laser'
      if (activeTheme === 'bento') return 'theme-bento'
      if (activeTheme === 'metropolis') return 'theme-metropolis'

      return 'theme-metropolis'
    }
  },
  methods: {
    checkAuthState () {
      localStorage.getItem('loggedin')
      this.$store.commit('LOG_IN')
    }
  }
}
</script>

<template>
  <main
    :class="containerClass"
    class="keebhoarder-theme bg-theme-bg font-body tracking-wider min-w-screen min-h-screen h-screen w-screen bg-caps flex flex-col items-center justify-between relative"
  >
    <Navigation />
    <section class="relative z-10 w-full px-6 mt-2 rounded-lg flex-grow">
      <router-view />
    </section>
    <Footer />
    <Utilities />
  </main>
</template>

<style lang="scss">
@import "./assets/main.scss";
</style>
