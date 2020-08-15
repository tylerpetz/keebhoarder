import Vue from 'vue'
import Vuex from 'vuex'
import items from './modules/items'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeModal: false,
    user: {},
    activeTheme: 'milkshake'
  },
  getters: {
    loggedIn: (state) => Object.keys(state.user).length > 0,
    activeTheme: (state) => state.activeTheme
  },
  actions: {
    keyboardShortcut ({ commit }, shortcut) {
      commit('SET_ACTIVE_MODAL', 'login')
    }
  },
  mutations: {
    SET_ACTIVE_MODAL (state, modal = false) {
      state.activeModal = modal
    },
    SET_ACTIVE_THEME (state, theme = false) {
      state.activeTheme = theme
    },
    LOG_IN (state, user) {
      state.user = { loggedIn: true }
    },
    LOG_OUT (state) {
      state.user = {}
    }
  },
  modules: {
    items
  }
})
