import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeModal: false,
    activeTheme: 'milkshake',
    userToken: false
  },
  getters: {
    loggedIn: (state) => !!state.userToken,
    activeTheme: (state) => state.activeTheme
  },
  actions: {
    login ({ commit }, { email = '', password = '' }) {
      localStorage.setItem('token', 'aksdjflkjsdlfkjsdlf')
      commit('SET_USER_TOKEN', 'aksdjflkjsdlfkjsdlf')
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      commit('SET_USER_TOKEN', false)
    },
    register ({ commit }, { email = '', password = '' }) {
      localStorage.setItem('token')
      commit('SET_USER_TOKEN', 'aksdjflkjsdlfkjsdlf')
    },
    forgotPassword ({ commit }, { email = '' }) {
      commit('SET_USER_TOKEN', 'aksdjflkjsdlfkjsdlf')
    }
  },
  mutations: {
    SET_ACTIVE_MODAL (state, modal = false) {
      state.activeModal = modal
    },
    SET_ACTIVE_THEME (state, theme = false) {
      state.activeTheme = theme
    },
    SET_USER_TOKEN (state, userToken) {
      state.userToken = userToken
    }
  }
})
