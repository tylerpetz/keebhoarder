import { ModalProvider } from '@/compositions/modal-provider.js'

export default {
  name: 'ModalList',
  data () {
    return {
      modals: [],
      ModalProvider
    }
  },
  created () {
    const req = require.context('./', true, /\.(vue)$/i)
    req.keys().forEach((key) => {
      const name = key.match(/\w+/)[0]
      this.$options.components[name] = req(key).default
      this.modals.push(name)
    })
  },
  computed: {
    currentModal () {
      return this.ModalProvider.getModal.value || {}
    }
  },
  render (h) {
    return h(this.currentModal.id, {
      ...this.currentModal.data
    })
  }
}
