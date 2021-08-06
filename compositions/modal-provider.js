import { reactive, computed, readonly } from '@vue/composition-api'

const state = reactive({
  modal: {
    id: '',
    data: {},
  },
  resolve: null,
})

function showModal(id, data = {}) {
  state.modal.id = id
  state.modal.data = data
  return new Promise((resolve) => {
    state.resolve = resolve
  })
}

function closeModal(...data) {
  state.modal.id = ''
  state.modal.data = {}
  if (state.resolve) state.resolve(...data)
}

const getModal = computed(() => state.modal)

export const ModalProvider = readonly({
  showModal,
  closeModal,
  getModal,
})
