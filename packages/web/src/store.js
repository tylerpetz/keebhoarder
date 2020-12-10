import {
  themes,
  defaultTheme
} from '@/utils/themes.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = {
  activeModal: false,
  activeTheme: defaultTheme,
  userToken: false
}

export const getters = {
  loggedIn: (state) => !!state.userToken
}

export const actions = {
  login ({ commit }, { email = '', password = '' } = {}) {
    if (!email || !password) return
    localStorage.setItem('token', 'aksdjflkjsdlfkjsdlf')
    commit('SET_USER_TOKEN', 'aksdjflkjsdlfkjsdlf')
  },
  register ({ commit }, { email = '', password = '' } = {}) {
    if (!email || !password) return
    localStorage.setItem('token', 'aksdjflkjsdlfkjsdlf')
    commit('SET_USER_TOKEN', 'aksdjflkjsdlfkjsdlf')
  },
  logout ({ commit }) {
    localStorage.removeItem('token')
    commit('SET_USER_TOKEN', false)
  }
}

export const mutations = {
  SET_ACTIVE_MODAL (state, modal = false) {
    state.activeModal = modal
  },
  SET_ACTIVE_THEME (state, { id, name }) {
    if (themes.some(theme => theme.name === name && theme.id === id)) {
      state.activeTheme = { id, name }

      if (window.localStorage) {
        localStorage.setItem('activeTheme', JSON.stringify({ id, name }))
      }
    }
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
