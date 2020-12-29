import { shallowMount } from '@vue/test-utils'
import FormSelect from '@/components/FormSelect.vue'

describe('FormSelect.vue', () => {
  it('renders classes added to input', () => {
    const wrapper = shallowMount(FormSelect, {
      propsData: { inputClasses: 'test-class' }
    }).find('select')
    expect(wrapper.classes()).toContain('test-class')
  })

  it('accepts props as input value', () => {
    const wrapper = shallowMount(FormSelect, {
      propsData: {
        options: [
          {
            text: 'option 1',
            value: 1
          },
          {
            text: 'option 2',
            value: 2
          }
        ]
      }
    }).findAll('select > option')
    expect(wrapper.length).toEqual(2)
  })

  it('accepts a placeholder', () => {
    const wrapper = shallowMount(FormSelect, {
      propsData: {
        placeholder: 'nothing to see here'
      }
    }).findAll('select > option')
    expect(wrapper.at(0).html()).toEqual('<option selected="selected" disabled="disabled">nothing to see here</option>')
  })
})
