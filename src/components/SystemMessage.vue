<script>
import { MessageProvider } from './Message-provider.js'

export default {
  name: 'MessageList',
  data () {
    return {
      show: false,
      MessageProvider
    }
  },
  computed: {
    currentMessage () {
      return this.MessageProvider.getMessage.value || {}
    }
  },
  render (h) {
    return h(this.currentMessage.id, {
      ...this.currentMessage.data
    })
  }
}
</script>

<template>
  <div
    aria-live="assertive"
    class="fixed inset-0 flex px-4 py-6 pointer-events-none sm:p-6 items-end"
  >
    <div class="w-full flex flex-col items-start space-y-6">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          class="max-w-sm w-full bg-theme-bg-d shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 text-green-400">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm text-theme-text font-semibold">
                  Successfully saved!
                </p>
                <p class="mt-1 text-sm text-theme-text-d">
                  Anyone with a link can now view this file.
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  class="bg-transparent rounded-md inline-flex text-theme-text hover:text-theme-text-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="show = false"
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
        <!-- <div
          v-if="show"
          class="max-w-sm w-full bg-theme-bg-d shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 text-red-600">
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
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm text-theme-text font-semibold">
                  Unsuccessfully saved!
                </p>
                <p class="mt-1 text-sm text-theme-text-d">
                  O NO
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  class="bg-transparent rounded-md inline-flex text-theme-text hover:text-theme-text-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="show = false"
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
        </div> -->
      </transition>
    </div>
  </div>
</template>
