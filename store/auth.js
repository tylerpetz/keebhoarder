import supabase from '@/utils/supabase'

const setUser = function (user) {
  localStorage.setItem('currentUser', JSON.stringify(user))
}

export default {
  namespaced: true,
  state() {
    return {
      error: '',
      currentUser: null,
      tokens: {},
    }
  },
  getters: {
    loggedIn: (state) => !!state.currentUser,
    currentUser: (state) => state.currentUser,
  },
  actions: {
    // attemptLogin({ commit }) {
    //   if (
    //     localStorage.getItem('tokens') &&
    //     localStorage.getItem('currentUser')
    //   ) {
    //     const tokens = JSON.parse(localStorage.getItem('tokens'))
    //     const user = JSON.parse(localStorage.getItem('currentUser'))
    //     setTokens(tokens, this.$axios)
    //     setUser(user)
    //     commit('AUTH_SUCCESS', { tokens, currentUser: user })
    //   }
    // },
    async register({ commit }, credentials) {
      if (credentials.password !== credentials.passwordRepeat) {
        return commit('AUTH_ERROR', 'Your passwords must match!')
      } else {
        delete credentials.passwordRepeat
      }
      try {
        const { user, error } = await supabase.auth.signUp(credentials)
        if (error) throw error
        setUser(user)
        commit('AUTH_SUCCESS', { currentUser: user })
        return 'success'
      } catch (e) {
        commit(
          'AUTH_ERROR',
          e.response.data.message || 'There was a problem registering you.'
        )
        return 'error'
      }
    },
    async login({ commit }, credentials) {
      try {
        const { user, error } = await supabase.auth.signIn(credentials)
        if (error) throw error
        setUser(user)
        commit('AUTH_SUCCESS', { currentUser: user })
        return 'success'
      } catch (e) {
        commit(
          'AUTH_ERROR',
          e.response.data.message || 'There was a problem logging you in.'
        )
        return 'error'
      }
    },
    async logout({ state, commit }) {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (e) {
        commit('AUTH_ERROR')
      } finally {
        commit('LOGOUT')
      }
    },
    // async verifyEmailToken({ commit }, token) {
    //   try {
    //     await this.$axios.post('/auth/verify-email', token)
    //     return 'success'
    //   } catch (e) {
    //     commit(
    //       'AUTH_ERROR',
    //       e.response.data.message || 'There was a problem verifying your email.'
    //     )
    //     return 'error'
    //   }
    // },
    async forgotPassword({ commit }, user) {
      try {
        const { error } = await supabase.auth.api.resetPasswordForEmail(
          user.email
        )
        if (error) throw error
        return 'success'
      } catch (e) {
        commit(
          'AUTH_ERROR',
          e.response.data.message || "We can't reset your password right now"
        )
        return 'error'
      }
    },
  },
  mutations: {
    AUTH_SUCCESS(state, { currentUser }) {
      // state.tokens = tokens
      state.currentUser = currentUser
    },
    AUTH_ERROR(state, error = 'error') {
      state.error = error
    },
    LOGOUT(state) {
      state.error = ''
      state.tokens = {}
      state.currentUser = null
    },
  },
}
