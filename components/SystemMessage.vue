<script>
import { MessageProvider } from '@/compositions/message-provider.js'

export default {
  name: 'MessageList',
  data() {
    return {
      MessageProvider,
    }
  },
  computed: {
    currentMessages() {
      return this.MessageProvider.getMessages.value || []
    },
  },
}
</script>

<template>
  <div
    aria-live="assertive"
    class="fixed inset-0 flex px-4 py-6 pointer-events-none sm:p-6 items-end"
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
      <div
        v-for="message in currentMessages"
        :key="message.id"
        class="
          max-w-sm
          w-full
          bg-theme-bg-d
          shadow-lg
          rounded-lg
          pointer-events-auto
          ring-1 ring-black ring-opacity-5
          overflow-hidden
        "
      >
        <div class="p-4">
          <div class="flex items-start">
            <div
              class="flex-shrink-0"
              :class="{
                'text-green-400': message.type === 'success',
                'text-red-600': message.type === 'error',
                hidden: !message.type,
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  v-if="message.type === 'success'"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p
                v-if="message.title"
                class="text-sm text-theme-text font-semibold"
              >
                {{ message.title }}
              </p>
              <p v-if="message.text" class="mt-1 text-sm text-theme-text-d">
                {{ message.text }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                class="
                  bg-transparent
                  rounded-md
                  inline-flex
                  text-theme-text
                  hover:text-theme-text-l
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-theme-border
                "
                @click="$closeMessage(message.id)"
              >
                <span class="sr-only">Close</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>
