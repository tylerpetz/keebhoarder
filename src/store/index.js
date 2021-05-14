import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import auth from './modules/auth'
import item from './modules/item'
import list from './modules/list'
import order from './modules/order'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    app,
    auth,
    item,
    list,
    order
  }
})

export default store
