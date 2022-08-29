import { reactive, computed, readonly } from '@nuxtjs/composition-api'

const state = reactive({
  messages: [],
})

function showMessage({ title, text, type, closeAfter = 2000 }) {
  const id = Date.now()

  state.messages.push({
    id,
    title,
    text,
    type,
  })

  if (closeAfter) {
    setTimeout(function () {
      closeMessage(id)
    }, closeAfter)
  }
}

function closeMessage(id) {
  const idx = state.messages.findIndex((msg) => msg.id === id)
  if (idx > -1) {
    state.messages.splice(idx, 1)
  }
}

const getMessages = computed(() => state.messages)

export const MessageProvider = readonly({
  showMessage,
  closeMessage,
  getMessages,
})
