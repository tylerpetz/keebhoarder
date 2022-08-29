<script>
import { MessageProvider } from '@/compositions/message-provider.js'

export default {
  name: 'SystemMessages',
  data() {
    return {
      MessageProvider,
    }
  },
  computed: {
    currentMessages() {
      return this.MessageProvider.getMessages || []
    },
  },
}
</script>

<template>
  <div
    aria-live="assertive"
    class="fixed inset-0 flex px-4 py-6 pointer-events-none sm:p-6 items-end z-50"
  >
    <transition-group
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      tag="div"
      class="w-full flex flex-col items-start space-y-6"
    >
      <system-message
        v-for="message in currentMessages"
        :key="message.id"
        :message="message"
      />
    </transition-group>
  </div>
</template>
