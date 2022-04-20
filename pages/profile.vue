<script>
const PROFILE_FORM_INPUT = {
  avatar_url: null,
  website: '',
  theme: null,
}

export default {
  name: 'Profile',
  middleware: 'auth',
  data() {
    return {
      form: PROFILE_FORM_INPUT,
      message: '',
    }
  },
  computed: {
    website: {
      get() {
        return this.$auth.user.profile.website
      },
      set(newVal) {
        this.form.website = newVal
      },
    },
  },
  methods: {
    async handleSubmit() {
      await await this.$axios.$put('/me', this.form)
      this.form = PROFILE_FORM_INPUT
      this.$showMessage({
        title: 'Profile Saved',
        text: 'Nice job.',
        type: 'success',
      })
    },
  },
}
</script>

<template>
  <div>
    <pre>{{ $auth.user }}</pre>
    <div class="w-full max-w-2xl mx-auto">
      <div
        class="
          max-w-3xl
          mx-auto
          py-10
          px-4
          sm:px-6
          lg:py-12 lg:px-8
          text-theme-text
        "
      >
        <h1 class="text-2xl sm:text-3xl">Settings</h1>
        <form
          class="mt-6 space-y-8"
          @keydown.enter="handleSubmit"
          @submit.prevent="handleSubmit"
        >
          <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div class="sm:col-span-6">
              <h2 class="text-2xl sm:text-2xl">
                {{ $auth.user.profile.name }}
              </h2>
              <h3>{{ $auth.user.email }}</h3>
            </div>

            <!-- <div class="sm:col-span-6">
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
                      <span class="sr-only">user photo</span>
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
            </div> -->

            <div class="sm:col-span-6">
              <FormInput v-model.lazy="website">Website URL</FormInput>
            </div>
            <div class="sm:col-span-6">
              <Keycap
                theme="mod"
                cap-style="large"
                @click.native="$showModal('ThemeModal')"
              >
                Swap Keycaps
              </Keycap>
              Current theme:
              {{
                $auth.user.profile.theme || $store.state.app.activeTheme.name
              }}
            </div>
          </div>

          <div class="pt-8 flex justify-end space-x-6">
            <Keycap cap-style="large">Cancel</Keycap>
            <Keycap cap-style="large" theme="accent" type="submit">Save</Keycap>
          </div>

          <div v-if="message"></div>
        </form>
      </div>
    </div>
  </div>
</template>
