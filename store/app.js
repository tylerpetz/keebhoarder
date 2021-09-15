import { themes, defaultTheme } from '@/utils/themes.js'

export default {
  namespaced: true,
  state() {
    return {
      activeTheme: defaultTheme,
    }
  },
  getters: {
    themeFavicon: (state) => `/favicon-${state.activeTheme.id}.svg`,
  },
  actions: {
    changeThemes({ commit }, theme) {
      commit('SET_ACTIVE_THEME', theme)
    },
  },
  mutations: {
    SET_ACTIVE_THEME(state, { id }) {
      const themeIndex = themes.findIndex((theme) => theme.id === id)
      state.activeTheme = themes[themeIndex]
      if (window.localStorage) {
        localStorage.setItem('activeTheme', JSON.stringify(themes[themeIndex]))
      }
    },
  },
}
