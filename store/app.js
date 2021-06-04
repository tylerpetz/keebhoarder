import { themes, defaultTheme } from '@/utils/themes.js'

export default {
  namespaced: true,
  state() {
    return {
      activeTheme: defaultTheme,
    }
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
