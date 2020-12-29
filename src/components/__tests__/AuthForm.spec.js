import { mount } from '@vue/test-utils'
import AuthForm from '@/components/AuthForm.vue'

const dispatch = jest.fn()

describe('AuthForm.vue', () => {
  it('closes modal for forgot password', async () => {
    const wrapper = mount(AuthForm, {
      propsData: {
        authType: 'login'
      },
      stubs: ['Keycap', 'Modal', 'FormInput']
    })
    await wrapper.find('[data-test="forgot-password"]').trigger('click')
    expect(wrapper.emitted()).toEqual({ close: [[]] })
  })

  it('renders classes added to input', async () => {
    const wrapper = mount(AuthForm, {
      propsData: {
        authType: 'login'
      },
      mocks: {
        $store: {
          dispatch
        }
      },
      stubs: ['Keycap', 'Modal', 'FormInput']
    })
    await wrapper.find('form').trigger('submit.prevent')
    expect(dispatch).toHaveBeenCalledWith('login', { email: '', password: '' })
  })
})
