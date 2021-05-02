import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGtag from 'vue-gtag'
import FormInput from '@/components/FormInput.vue'
import FormSelect from '@/components/FormSelect.vue'
import Keycap from '@/components/Keycap.vue'
import Modal from '@/components/Modal.vue'
import './assets/main.css'
import './assets/themes.css'

import attemptToAuthorizeTokens from './helpers/authorize-tokens'

Vue.config.productionTip = false
Vue.use(VueGtag, {
  config: { id: 'UA-131740937-2' }
})
Vue.use(VueAxios, axios)
Vue.component('Keycap', Keycap)
Vue.component('Modal', Modal)
Vue.component('FormInput', FormInput)
Vue.component('FormSelect', FormSelect)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#keebhoarder')

const loginUserFromStorage = () => {
  const tokens = JSON.parse(localStorage.getItem('tokens')) || null
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null
  if (!tokens || !currentUser) return
  store.commit('auth/AUTH_SUCCESS', { tokens, currentUser })
}

attemptToAuthorizeTokens()
loginUserFromStorage()
