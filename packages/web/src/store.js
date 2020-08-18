import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const THEMES = [
  '8008',
  '9009',
  'dolch',
  'milkshake',
  'oblivion',
  'laser',
  'bento',
  'metropolis',
  'wavez'
]

export const state = {
  activeModal: false,
  activeTheme: 'milkshake',
  userToken: false
}

export const getters = {
  loggedIn: (state) => !!state.userToken
}

export const actions = {
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
}

export const mutations = {
  SET_ACTIVE_MODAL (state, modal = false) {
    state.activeModal = modal
  },
  SET_ACTIVE_THEME (state, theme = '') {
    if (THEMES.includes(theme)) { state.activeTheme = theme }
  },
  SET_USER_TOKEN (state, userToken) {
    state.userToken = userToken
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
