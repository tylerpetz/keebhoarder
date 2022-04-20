export default {
  actions: {
    nuxtServerInit ({ commit }, { $auth }) {
      if ($auth.user?.profile?.theme) {
        commit('app/SET_ACTIVE_THEME', { id: $auth.user.profile.theme })
      }
    }
  }
}
