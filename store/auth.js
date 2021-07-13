import supabase from '@/utils/supabase'

export default {
  namespaced: true,
  state() {
    return {
      error: '',
      session: null,
    }
  },
  getters: {
    loggedIn: (state) => !!state.session,
    currentUser: (state) =>
      state.session && state.session.user ? state.session.user : null,
  },
  actions: {
    initSupabase({ commit }) {
      commit('SET_SB_SESSION', supabase.auth.session())
      supabase.auth.onAuthStateChange((_event, session) => {
        commit('SET_SB_SESSION', session)
      })
    },
    // async getUser() {
    //   const { data: profiles } = await supabase
    //     .from('profiles')
    //     .select('username,website,avatar_url')
    // },
    async register({ commit }, credentials) {
      if (credentials.password !== credentials.passwordRepeat) {
        return commit('AUTH_ERROR', 'Your passwords must match!')
      } else {
        delete credentials.passwordRepeat
      }
      try {
        const { error } = await supabase.auth.signUp(credentials)
        if (error) throw error
        return 'success'
      } catch (e) {
        commit(
          'AUTH_ERROR',
          e.response.data.message || 'There was a problem registering you.'
        )
        return 'error'
      }
    },
    async login(ctx, credentials) {
      const { error } = await supabase.auth.signIn(credentials)
      if (error) {
        return error.message || 'Invalid email or password.'
      }
      return 'success'
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
    AUTH_ERROR(state, error = 'error') {
      state.error = error
    },
    LOGOUT(state) {
      state.error = ''
      state.currentUser = null
    },
    SET_SB_SESSION(state, session) {
      state.session = session
    },
  },
}
