import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueGtag from 'vue-gtag'
import FormInput from '@/components/FormInput.vue'
import FormSelect from '@/components/FormSelect.vue'
import Keycap from '@/components/Keycap.vue'
import Modal from '@/components/Modal.vue'
import Shortcut from '@/components/Shortcut.vue'
import './assets/themes.css'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'http://localhost:4000'
})

Vue.config.productionTip = false
Vue.use(VueGtag, {
  config: { id: 'UA-131740937-2' }
})
Vue.component('Keycap', Keycap)
Vue.component('Modal', Modal)
Vue.component('Shortcut', Shortcut)
Vue.component('FormInput', FormInput)
Vue.component('FormSelect', FormSelect)

Vue.use(VueApollo)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})
new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#keebhoarder')
