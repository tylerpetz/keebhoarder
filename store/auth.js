import { removeEmpty } from '@/utils/methods.js'

export default {
  namespaced: true,
  state() {
    return {
      error: '',
      session: null,
      profile: {},
    }
  },
  getters: {
    loggedIn: (state) => !!(state.session && state.session.user),
    currentUser: (state) =>
      state.session && state.session.user ? state.session.user : null,
    currentUserProfile: (state) => state.profile,
  },
  actions: {
    initSupabase({ commit }) {
      commit('SET_SB_SESSION', this.$supabase.auth.session())
      this.$supabase.auth.onAuthStateChange((_event, session) => {
        commit('SET_SB_SESSION', session)
      })
    },
    async getUserProfile({ commit }) {
      const { data: profiles } = await this.$supabase
        .from('profiles')
        .select('*')
      commit('SET_USER_PROFILE', profiles[0])
    },
    async updateUserProfile({ commit, getters }, updatedProfile) {
      const { data: profiles } = await this.$supabase
        .from('profiles')
        .update(removeEmpty(updatedProfile))
        .eq('id', getters.currentUser.id)
      commit('SET_USER_PROFILE', profiles[0])
    },
    async register({ commit }, credentials) {
      if (credentials.password !== credentials.passwordRepeat) {
        return commit('AUTH_ERROR', 'Your passwords must match!')
      } else {
        delete credentials.passwordRepeat
      }
      try {
        const { error } = await this.$supabase.auth.signUp(credentials)
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
      const { error } = await this.$supabase.auth.signIn(credentials)
      if (error) {
        return error.message || 'Invalid email or password.'
      }
      return 'success'
    },
    async logout({ state, commit }) {
      try {
        const { error } = await this.$supabase.auth.signOut()
        if (error) throw error
      } catch (e) {
        commit('AUTH_ERROR')
      } finally {
        commit('LOGOUT')
        commit('SET_USER_PROFILE')
      }
    },
    async forgotPassword({ commit }, user) {
      try {
        const { error } = await this.$supabase.auth.api.resetPasswordForEmail(
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
    SET_USER_PROFILE(state, profile = {}) {
      state.profile = profile
    },
  },
}
