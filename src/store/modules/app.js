import {
  themes,
  defaultTheme
} from '@/utils/themes.js'

export default {
  namespaced: true,
  state () {
    return {
      activeModal: false,
      activeTheme: defaultTheme,
      isDevEnvironment: false,
      siteURL: null
    }
  },
  getters: {
    isDevEnvironment: state => state.isDevEnvironment,
    siteURL: state => state.siteURL
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
    },
    SET_DEV_ENV (state, value) {
      state.isDevEnvironment = value
    },
    SET_SITE_URL (state, value) {
      state.siteURL = value
    }
  }
}
