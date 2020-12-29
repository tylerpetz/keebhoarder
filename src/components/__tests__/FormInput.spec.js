import { shallowMount, mount } from '@vue/test-utils'
import FormInput from '@/components/FormInput.vue'

describe('FormInput.vue', () => {
  it('renders classes added to input', () => {
    const wrapper = shallowMount(FormInput, {
      propsData: { inputClasses: 'test-class' }
    }).find('input')
    expect(wrapper.classes()).toContain('test-class')
  })

  it('uses v-model as input value', () => {
    const wrapper = shallowMount(FormInput, {
      propsData: { value: 'test input' }
    }).find('input')
    expect(wrapper.element._value).toMatch('test input')
  })

  it('emits the text that was entered', async () => {
    const wrapper = mount(FormInput, {
      propsData: { value: 'test input' }
    })
    const textInput = wrapper.find('input')
    textInput.setValue('updated text input')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().input[0]).toEqual(['updated text input'])
  })
})
