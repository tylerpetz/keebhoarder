<script>
import WelcomeScreen from '@/components/WelcomeScreen'
import Dashboard from '@/components/Dashboard'

export default {
  name: 'Home',
  components: {
    WelcomeScreen,
    Dashboard
  },
  render (h) {
    if (!this.$store.getters['auth/loggedIn']) return h('WelcomeScreen')
    return h('Dashboard')
  }
}
</script>
