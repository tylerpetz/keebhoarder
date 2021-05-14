import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import app from './modules/app'
import list from './modules/list'
import item from './modules/item'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    app,
    list,
    item
  }
})

export default store
