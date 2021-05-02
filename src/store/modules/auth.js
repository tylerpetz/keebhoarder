import Vue from 'vue'

const setTokensAndUser = function (tokens, user) {
  localStorage.setItem('tokens', JSON.stringify(tokens))
  localStorage.setItem('currentUser', JSON.stringify(user))
  Vue.axios.defaults.headers.common.Authorization = `Bearer ${tokens.access.token}`
}

export default {
  namespaced: true,
  state () {
    return {
      error: '',
      currentUser: null,
      tokens: {}
    }
  },
  getters: {
    loggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser
  },
  actions: {
    attemptLogin ({ commit }) {
      if (localStorage.getItem('tokens') && localStorage.getItem('currentUser')) {
        const tokens = JSON.parse(localStorage.getItem('tokens'))
        const user = JSON.parse(localStorage.getItem('currentUser'))
        setTokensAndUser(tokens, user)
        commit('AUTH_SUCCESS', { tokens, currentUser: user })
      }
    },
    async register ({ commit }, user) {
      if (user.password !== user.passwordRepeat) {
        return commit('AUTH_ERROR', 'Your passwords must match!')
      } else {
        delete user.passwordRepeat
      }
      try {
        const { data } = await Vue.axios.post('http://localhost:3000/v1/auth/register', user)
        setTokensAndUser(data.tokens, data.user)
        commit('AUTH_SUCCESS', { tokens: data.tokens, currentUser: data.user })
        return 'success'
      } catch (e) {
        commit('AUTH_ERROR', e.response.data.message || 'There was a problem registering you.')
        return 'error'
      }
    },
    async login ({ commit }, user) {
      try {
        const { data } = await Vue.axios.post('http://localhost:3000/v1/auth/login', user)
        setTokensAndUser(data.tokens, data.user)
        commit('AUTH_SUCCESS', { tokens: data.tokens, currentUser: data.user })
        return 'success'
      } catch (e) {
        commit('AUTH_ERROR', e.response.data.message || 'There was a problem logging you in.')
        return 'error'
      }
    },
    async logout ({ state, commit }) {
      try {
        if (state.tokens.refresh.token) {
          await Vue.axios.post('http://localhost:3000/v1/auth/logout', { refreshToken: state.tokens.refresh.token })
        }
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
      state.tokens = tokens
      state.currentUser = currentUser
    },
    AUTH_ERROR (state, error = 'error') {
      state.error = error
    },
    LOGOUT (state) {
      state.error = ''
      state.tokens = {}
      state.currentUser = null
    }
  }
}
