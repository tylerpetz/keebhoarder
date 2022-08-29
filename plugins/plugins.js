import { MessageProvider, ModalProvider } from '@/compositions'

export default (context, inject) => {
  inject('showModal', ModalProvider.showModal)
  inject('closeModal', ModalProvider.closeModal)
  inject('currentModal', ModalProvider.getModal.value)

  inject('showMessage', MessageProvider.showMessage)
  inject('closeMessage', MessageProvider.closeMessage)
  inject('getMessages', MessageProvider.getMessages.value)
}
