<script>
import Keycap from './Keycap.vue'
export default {
  name: 'Dashboard',
  components: { Keycap },
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
    class="
      flex
      bg-theme-bg
      h-full
      text-theme-text-d
      items-center
      justify-center
    "
  >
    <div>
      <ul role="list" class="mt-6 py-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <li class="flow-root">
          <div
            class="
              relative
              -m-2
              p-2
              flex
              items-center
              space-x-4
              rounded-xl
              hover:bg-theme-bg-l hover:shadow
              focus-within:ring-2 focus-within:ring-indigo-500
            "
          >
            <div
              class="flex-shrink-0 flex items-center justify-center h-16 w-16"
            >
              <Keycap>L</Keycap>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-theme-text-l">
                <a href="#" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  Create a List<span aria-hidden="true"> &rarr;</span>
                </a>
              </h3>
              <!-- <p class="mt-1 text-sm text-theme-text">
                Another to-do system you’ll try but eventually give up on.
              </p> -->
            </div>
          </div>
        </li>

        <li class="flow-root">
          <div
            class="
              relative
              -m-2
              p-2
              flex
              items-center
              space-x-4
              rounded-xl
              hover:bg-theme-bg-l hover:shadow
              focus-within:ring-2 focus-within:ring-indigo-500
            "
          >
            <div
              class="flex-shrink-0 flex items-center justify-center h-16 w-16"
            >
              <Keycap>I</Keycap>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-theme-text-l">
                <a href="#" class="focus:outline-none">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  Add some Items<span aria-hidden="true"> &rarr;</span>
                </a>
              </h3>
              <!-- <p class="mt-1 text-sm text-theme-text">
                Another to-do system you’ll try but eventually give up on.
              </p> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
