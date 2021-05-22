import Vue from 'vue'
import './helpers/install-composition-api'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGtag from 'vue-gtag'
import VueCurrencyInput from 'vue-currency-input'
import FormInput from '@/components/FormInput.vue'
import FormSelect from '@/components/FormSelect.vue'
import FormToggle from '@/components/FormToggle.vue'
import Keycap from '@/components/Keycap.vue'
import Modal from '@/components/Modal.vue'
import IsPublic from '@/components/IsPublic.vue'
import VueGoodTablePlugin from 'vue-good-table'
import './assets/main.css'
import './assets/themes.css'
import './assets/table.scss'

import attemptToAuthorizeTokens from './helpers/authorize-tokens'

Vue.config.productionTip = false
Vue.use(VueGtag, {
  config: { id: 'UA-131740937-2' }
})
Vue.use(VueAxios, axios)
Vue.use(VueGoodTablePlugin)
Vue.use(VueCurrencyInput, {
  globalOptions: {
    currency: 'USD',
    locale: 'en',
    valueAsInteger: true,
    distractionFree: {
      hideNegligibleDecimalDigits: false,
      hideCurrencySymbol: true,
      hideGroupingSymbol: true
    },
    valueRange: { min: 0 },
    allowNegative: false
  }
})
Vue.component('Keycap', Keycap)
Vue.component('Modal', Modal)
Vue.component('FormInput', FormInput)
Vue.component('FormSelect', FormSelect)
Vue.component('FormToggle', FormToggle)
Vue.component('IsPublic', IsPublic)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#keebhoarder')

attemptToAuthorizeTokens()

const axiosEnvUrls = {
  development: 'http://localhost:3000/v1',
  test: 'http://localhost:3000/v1',
  production: 'https://keebhoarder-api.herokuapp.com/v1'
}
Vue.axios.defaults.baseURL = axiosEnvUrls[process.env.NODE_ENV] || 'https://keebhoarder-api.herokuapp.com/v1'
console.log(process.env)
