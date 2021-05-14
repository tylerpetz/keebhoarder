import { reactive, computed, readonly } from '@vue/composition-api'

const state = reactive({
  message: {
    id: '',
    data: {}
  },
  resolve: null
})

function showMessage (id, data = {}) {
  state.message.id = id
  state.message.data = data
  return new Promise((resolve) => {
    state.resolve = resolve
  })
}

function closeMessage (...data) {
  state.message.id = ''
  state.message.data = {}
  if (state.resolve) state.resolve(...data)
}

const getMessage = computed(() => state.message)

export const MessageProvider = readonly({
  showMessage,
  closeMessage,
  getMessage
})
