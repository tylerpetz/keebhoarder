import { shallowMount } from '@vue/test-utils'
import localStorage from './utils/localStorage'

import App from '@/App.vue'

window.localStorage = localStorage

const commit = jest.fn()

describe('App.vue', () => {
  it('renders classes added to body', () => {
    const wrapper = shallowMount(App, {
      mocks: {
        $store: {
          state: {
            app: {
              activeTheme: {
                id: '8008',
                name: '8008'
              }
            }
          }
        }
      },
      stubs: ['router-view']
    })
    expect(wrapper.classes()).toContain('theme-8008')
    expect(wrapper.vm.themeFavicon).toEqual('favicon-8008.svg')
  })

  it('sets modal in store when activemodal is set locally', () => {
    const wrapper = shallowMount(App, {
      mocks: {
        $store: {
          state: {
            app: {
              activeTheme: {
                id: '8008',
                name: '8008'
              },
              activeModal: false
            }
          },
          commit
        }
      },
      stubs: ['router-view']
    })
    wrapper.vm.activeModal = 'register'
    expect(commit).toHaveBeenCalledWith('app/SET_ACTIVE_MODAL', 'register')
  })

  it('closes modal', () => {
    const wrapper = shallowMount(App, {
      mocks: {
        $store: {
          state: {
            app: {
              activeTheme: {
                id: '8008',
                name: '8008'
              },
              activeModal: 'register'
            }
          },
          commit
        }
      },
      stubs: ['router-view']
    })
    wrapper.vm.activeModal = false
    expect(commit).toHaveBeenCalledWith('app/SET_ACTIVE_MODAL', false)
  })

  it('loads users theme from localstorage', async () => {
    // Set up our document body
    document.body.innerHTML =
    '<div id="favicon"></div>'
    window.localStorage.setItem('activeTheme', JSON.stringify({ id: 'milkshake', name: 'milkshake' }))
    const wrapper = shallowMount(App, {
      mocks: {
        $store: {
          state: {
            app: {
              activeTheme: {
                id: '8008',
                name: '8008'
              }
            }
          },
          commit
        }
      },
      stubs: ['router-view']
    })
    await wrapper.vm.$nextTick()
    expect(commit).toHaveBeenCalledWith('app/SET_ACTIVE_THEME', { id: 'milkshake', name: 'milkshake' })
  })
})
