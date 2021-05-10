import Vue from 'vue'

const setTokens = function (tokens) {
  localStorage.setItem('tokens', JSON.stringify(tokens))
  Vue.axios.defaults.headers.common.Authorization = `Bearer ${tokens.access.token}`
}

const setUser = function (user) {
  localStorage.setItem('currentUser', JSON.stringify(user))
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
        setTokens(tokens)
        setUser(user)
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
        const { data } = await Vue.axios.post('/auth/register', user)
        setTokens(data.tokens)
        setUser(data.user)
        commit('AUTH_SUCCESS', { tokens: data.tokens, currentUser: data.user })
        return 'success'
      } catch (e) {
        commit('AUTH_ERROR', e.response.data.message || 'There was a problem registering you.')
        return 'error'
      }
    },
    async login ({ commit }, user) {
      try {
        const { data } = await Vue.axios.post('/auth/login', user)
        setTokens(data.tokens)
        setUser(data.user)
        commit('AUTH_SUCCESS', { tokens: data.tokens, currentUser: data.user })
        return 'success'
      } catch (e) {
        commit('AUTH_ERROR', e.response.data.message || 'There was a problem logging you in.')
        return 'error'
      }
    },
    async refreshTokens ({ state, commit }) {
      try {
        if (state.tokens.refresh.token) {
          const { data } = await Vue.axios.post('/auth/refresh-tokens', { refreshToken: state.tokens.refresh.token })
          setTokens(data)
        }
      } catch (e) {
        localStorage.removeItem('tokens')
        localStorage.removeItem('currentUser')
        Vue.axios.defaults.headers.common.Authorization = ''
        commit('AUTH_ERROR')
        commit('LOGOUT')
      }
    },
    async logout ({ state, commit }) {
      try {
        if (state.tokens.refresh.token) {
          await Vue.axios.post('/auth/logout', { refreshToken: state.tokens.refresh.token })
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
