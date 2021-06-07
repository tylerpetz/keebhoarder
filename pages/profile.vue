<script>
export default {
  name: 'NotFound',
  mounted() {
    // this.$store.dispatch('auth/getUser')
  },
}
</script>

<template>
  <div>
    <pre>{{ $store.getters['auth/currentUser'] }}</pre>
    <div class="w-full max-w-2xl mx-auto">
      <div class="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:py-12 lg:px-8">
        <h1 class="text-3xl text-theme-text">Settings</h1>

        <form class="mt-6 space-y-8 divide-y divide-y-blue-gray-200">
          <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div class="sm:col-span-6">
              <form-input
                disabled
                :value="$store.getters['auth/currentUser'].username"
              >
                Username*
                <span class="text-xs italic">Usernames cannot be changed</span>
              </form-input>
            </div>

            <div class="sm:col-span-6">
              <form-input :value="$store.getters['auth/currentUser'].email">
                Email Address
              </form-input>
            </div>

            <div class="sm:col-span-6">
              <label
                for="photo"
                class="block text-sm font-medium text-blue-gray-900"
              >
                Photo
              </label>
              <div class="mt-1 flex items-center">
                <img
                  class="inline-block h-12 w-12 rounded-full"
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                  alt=""
                />
                <div class="ml-4 flex">
                  <div
                    class="
                      relative
                      bg-white
                      py-2
                      px-3
                      border border-blue-gray-300
                      rounded-md
                      shadow-sm
                      flex
                      items-center
                      cursor-pointer
                      hover:bg-blue-gray-50
                      focus-within:outline-none
                      focus-within:ring-2
                      focus-within:ring-offset-2
                      focus-within:ring-offset-blue-gray-50
                      focus-within:ring-blue-500
                    "
                  >
                    <label
                      for="user_photo"
                      class="
                        relative
                        text-sm
                        font-medium
                        text-blue-gray-900
                        pointer-events-none
                      "
                    >
                      <span>Change</span>
                      <span class="sr-only"> user photo</span>
                    </label>
                    <input
                      id="user_photo"
                      name="user_photo"
                      type="file"
                      class="
                        absolute
                        inset-0
                        w-full
                        h-full
                        opacity-0
                        cursor-pointer
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                  <button
                    type="button"
                    class="
                      ml-3
                      bg-transparent
                      py-2
                      px-3
                      border border-transparent
                      rounded-md
                      text-sm
                      font-medium
                      text-blue-gray-900
                      hover:text-blue-gray-700
                      focus:outline-none
                      focus:border-blue-gray-300
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-offset-blue-gray-50
                      focus:ring-blue-500
                    "
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="description"
                class="block text-sm font-medium text-blue-gray-900"
              >
                Description
              </label>
              <div class="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  class="
                    block
                    w-full
                    border border-blue-gray-300
                    rounded-md
                    shadow-sm
                    sm:text-sm
                    focus:ring-blue-500
                    focus:border-blue-500
                  "
                ></textarea>
              </div>
              <p class="mt-3 text-sm text-blue-gray-500">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>

            <div class="sm:col-span-6">
              <label
                for="url"
                class="block text-sm font-medium text-blue-gray-900"
              >
                URL
              </label>
              <input
                id="url"
                type="text"
                name="url"
                class="
                  mt-1
                  block
                  w-full
                  border-blue-gray-300
                  rounded-md
                  shadow-sm
                  text-blue-gray-900
                  sm:text-sm
                  focus:ring-blue-500
                  focus:border-blue-500
                "
              />
            </div>
          </div>

          <div class="pt-8 flex justify-end">
            <button
              type="button"
              class="
                bg-white
                py-2
                px-4
                border border-gray-300
                rounded-md
                shadow-sm
                text-sm
                font-medium
                text-blue-gray-900
                hover:bg-blue-gray-50
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              class="
                ml-3
                inline-flex
                justify-center
                py-2
                px-4
                border border-transparent
                shadow-sm
                text-sm
                font-medium
                rounded-md
                text-white
                bg-blue-600
                hover:bg-blue-700
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
