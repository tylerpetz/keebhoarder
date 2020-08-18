import { getters, mutations } from '@/store'

describe('store.js', () => {
  describe('getters', () => {
    it('loggedIn', () => {
      const state = {
        userToken: 'lpokjlkjflkjdslkfj'
      }
      expect(getters.loggedIn(state)).toBe(true)
    })
  })
  // describe('actions', () => {
  //   it('login', () => {

  //   })
  //   it('logout', () => {

  //   })
  //   it('register', () => {

  //   })
  //   it('forgotPassword', () => {

  //   })
  // })
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
