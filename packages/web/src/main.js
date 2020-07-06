import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import FormInput from '@/components/FormInput.vue'
import Keycap from '@/components/Keycap.vue'
import Modal from '@/components/Modal.vue'
import Shortcut from '@/components/Shortcut.vue'
import './assets/themes.css'

Vue.config.productionTip = false
Vue.component('Keycap', Keycap)
Vue.component('Modal', Modal)
Vue.component('Shortcut', Shortcut)
Vue.component('FormInput', FormInput)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#keebhoarder')
