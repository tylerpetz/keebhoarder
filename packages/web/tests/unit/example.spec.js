import { shallowMount, mount } from '@vue/test-utils'
import AuthForm from '@/components/AuthForm.vue'

describe('AuthForm.vue', () => {
  it('renders login form', () => {
    const wrapper = mount(AuthForm, {
      propsData: { authType: 'login' },
    })
    expect(wrapper.text()).toMatch('sup')
  })
})
