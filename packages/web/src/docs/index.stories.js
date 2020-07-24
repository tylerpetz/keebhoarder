import { addDecorator } from '@storybook/vue'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import Layout from '../components/Layout.vue'
import Keycap from '../components/Keycap.vue'
import '../assets/themes.css'

addDecorator(() => ({
  components: { Layout },
  template: '<layout><story/></layout>'
}))

export default {
  title: 'Keycap',
  decorators: [withKnobs]
}

export const keycapComponent = () => ({
  components: { Keycap },
  props: {
    text: {
      default: text('Keycap Text', 'G')
    },
    theme: {
      default: select('Style', ['alpha', 'mod', 'accent'], 'alpha')
    },
    textSize: {
      default: select('Text Size', ['small', 'large'], 'large')
    },
    capStyle: {
      default: select('Cap Style', ['small', 'large'], 'large')
    }
  },
  template: '<keycap :theme="theme">{{ text }}</keycap>'
})
