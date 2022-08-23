<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      orders: [],
      items: [],
    }
  },
}
</script>

<template>
  <div
    class="flex bg-theme-bg h-full text-theme-text-d items-center justify-center"
  >
    <div>
      <ul role="list" class="mt-6 py-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <li class="flow-root">
          <div
            class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-theme-bg-l hover:shadow focus-within:ring-2 focus-within:ring-indigo-500"
          >
            <button
              type="button"
              class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Keycap>L</Keycap>
              <span class="mt-2 block text-sm font-medium text-gray-900">
                Create a list
              </span>
            </button>
          </div>
        </li>

        <li class="flow-root">
          <div
            class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-theme-bg-l hover:shadow focus-within:ring-2 focus-within:ring-indigo-500"
          >
            <button
              type="button"
              class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Keycap>I</Keycap>
              <span class="mt-2 block text-sm font-medium text-gray-900">
                Create an item
              </span>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
