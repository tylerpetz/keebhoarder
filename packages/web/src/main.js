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

Vue.config.productionTip = false
Vue.use(VueGtag, {
  config: { id: 'UA-131740937-2' }
})
Vue.component('Keycap', Keycap)
Vue.component('Modal', Modal)
Vue.component('Shortcut', Shortcut)
Vue.component('FormInput', FormInput)
Vue.component('FormSelect', FormSelect)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#keebhoarder')
