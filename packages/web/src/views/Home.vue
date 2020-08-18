<script>
import WelcomeScreen from '@/components/WelcomeScreen'
import Dashboard from '@/components/Dashboard'

export default {
  name: 'Home',
  components: {
    WelcomeScreen,
    Dashboard
  },
  data () {
    return {
      loggedIn: false
    }
  },
  render (h) {
    if (!this.$store.getters.loggedIn) return h('WelcomeScreen')
    return h('Dashboard')
  }
}
</script>
