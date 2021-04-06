import Vue from 'vue'
import { register } from '../../api/authClient'

export default {
  namespaced: true,
  state () {
    return {
      status: '',
      currentUser: null,
      tokens: {}
    }
  },
  getters: {
    loggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser
  },
  actions: {
    async register ({ commit }, user) {
      commit('AUTH_START')
      try {
        const { data } = await register(user)
        localStorage.setItem('authToken', data.tokens.access.token)
        localStorage.setItem('refreshToken', data.tokens.refresh.token)
        Vue.axios.defaults.headers.common.Authorization = data.tokens.access.token
        commit('AUTH_SUCCESS', { tokens: data.tokens, currentUser: data.user })
      } catch (e) {
        commit('AUTH_ERROR')
      }
    }
  },
  mutations: {
    AUTH_SUCCESS (state, { tokens, currentUser }) {
      state.status = 'success'
      state.tokens = tokens
      state.currentUser = currentUser
    },
    AUTH_START (state) {
      state.status = 'loading'
    },
    AUTH_ERROR (state) {
      state.status = 'error'
    },
    LOGOUT (state) {
      state.status = ''
      state.tokens = {}
      state.currentUser = null
    }
  }
}
