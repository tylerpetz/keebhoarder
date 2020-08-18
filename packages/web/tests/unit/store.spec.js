import { getters, actions, mutations } from '@/store'
const commit = jest.fn()

describe('store.js', () => {
  describe('getters', () => {
    it('loggedIn', () => {
      const state = {
        userToken: 'lpokjlkjflkjdslkfj'
      }
      expect(getters.loggedIn(state)).toBe(true)
    })
  })

  describe('actions', () => {
    it('login', async () => {
      const email = 'keeb@keebhoarder.com'
      const password = 'password'
      await actions.login({ commit }, { email, password })
      expect(commit).toHaveBeenCalledWith('SET_USER_TOKEN', 'aksdjflkjsdlfkjsdlf')
      await actions.login({ commit })
      expect(commit).toHaveBeenCalledWith('SET_USER_TOKEN', 'aksdjflkjsdlfkjsdlf')
    })
    it('register', async () => {
      const email = 'keeb@keebhoarder.com'
      const password = 'password'
      await actions.register({ commit }, { email, password })
      expect(commit).toHaveBeenCalledWith('SET_USER_TOKEN', 'aksdjflkjsdlfkjsdlf')
      await actions.register({ commit })
      expect(commit).toHaveBeenCalledWith('SET_USER_TOKEN', 'aksdjflkjsdlfkjsdlf')
    })
    it('logout', async () => {
      await actions.logout({ commit })
      expect(commit).toHaveBeenCalledWith('SET_USER_TOKEN', false)
    })
  })

  describe('mutations', () => {
    it('SET_ACTIVE_MODAL', () => {
      const state = {
        activeModal: false
      }
      mutations.SET_ACTIVE_MODAL(state, 'register')
      expect(state.activeModal).toBe('register')
      mutations.SET_ACTIVE_MODAL(state, false)
      expect(state.activeModal).toBe(false)
      mutations.SET_ACTIVE_MODAL(state, 'login')
      expect(state.activeModal).toBe('login')
      mutations.SET_ACTIVE_MODAL(state)
      expect(state.activeModal).toBe(false)
    })
    it('SET_ACTIVE_THEME', () => {
      const state = {
        activeTheme: 'milkshake'
      }
      mutations.SET_ACTIVE_THEME(state, '8008')
      expect(state.activeTheme).toBe('8008')
      mutations.SET_ACTIVE_THEME(state, false)
      expect(state.activeTheme).toBe('8008')
      mutations.SET_ACTIVE_THEME(state, 'milkshake')
      expect(state.activeTheme).toBe('milkshake')
      mutations.SET_ACTIVE_THEME(state)
      expect(state.activeTheme).toBe('milkshake')
    })
    it('SET_USER_TOKEN', () => {
      const state = {
        userToken: false
      }
      mutations.SET_USER_TOKEN(state, 'asdfasdf')
      expect(state.userToken).toBe('asdfasdf')
    })
  })
})
