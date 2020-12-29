import {
  themes,
  defaultTheme
} from '@/utils/themes.js'

export default {
  namespaced: true,
  state () {
    return {
      activeModal: false,
      activeTheme: defaultTheme
    }
  },
  mutations: {
    SET_ACTIVE_MODAL (state, modal = false) {
      state.activeModal = modal
    },
    SET_ACTIVE_THEME (state, { id, name }) {
      if (themes.some(theme => theme.name === name && theme.id === id)) {
        state.activeTheme = { id, name }

        if (window.localStorage) {
          localStorage.setItem('activeTheme', JSON.stringify({ id, name }))
        }
      }
    }
  }
}
