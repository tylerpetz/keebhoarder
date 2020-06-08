import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Keycap from '@/components/Keycap.vue'
import Shortcut from '@/components/Shortcut.vue'
import './assets/index.css'

Vue.config.productionTip = false
Vue.component('Keycap', Keycap)
Vue.component('Shortcut', Shortcut)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#keebhoarder')
