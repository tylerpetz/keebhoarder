import Vue from 'vue'

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
        const { data } = await Vue.axios.post('http://localhost:3000/v1/auth/register', user)
        localStorage.setItem('tokens', JSON.stringify(data.tokens))
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        Vue.axios.defaults.headers.common.Authorization = data.tokens.access.token
        commit('AUTH_SUCCESS', { tokens: data.tokens, currentUser: data.user })
      } catch (e) {
        commit('AUTH_ERROR')
      }
    },
    async login ({ commit }, user) {
      commit('AUTH_START')
      try {
        const { data } = await Vue.axios.post('http://localhost:3000/v1/auth/login', user)
        localStorage.setItem('tokens', JSON.stringify(data.tokens))
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        Vue.axios.defaults.headers.common.Authorization = data.tokens.access.token
        commit('AUTH_SUCCESS', { tokens: data.tokens, currentUser: data.user })
      } catch (e) {
        commit('AUTH_ERROR')
      }
    },
    async logout ({ commit }) {
      try {
        await Vue.axios.post('http://localhost:3000/v1/auth/logout')
        localStorage.removeItem('tokens')
        localStorage.removeItem('currentUser')
        Vue.axios.defaults.headers.common.Authorization = ''
      } catch (e) {
        commit('AUTH_ERROR')
      } finally {
        commit('LOGOUT')
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
