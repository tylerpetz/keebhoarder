import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeModal: false,
    user: {},
    activeTheme: 'wavez'
  },
  getters: {
    loggedIn: (state) => Object.keys(state.user).length > 0,
    activeTheme: (state) => state.activeTheme
  },
  actions: {
    keyboardShortcut ({ state, commit }, shortcut) {
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
  }
})
