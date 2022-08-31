<script>
export default {
  name: 'Photos',
  async mounted() {
    await this.$store.dispatch('photo/getPhotos')
  },
}
</script>

<template>
  <div class="h-full p-3">
    <div class="flex flex-col">
      <div
        class="p-6 bg-theme-bg-d mb-8 flex flex-row justify-between items-center rounded shadow"
      >
        <h3 class="text-xl leading-6 font-medium text-theme-text">Photos</h3>
        <Keycap
          theme="mod"
          cap-style="large"
          type="button"
          @click.native="$showModal('PhotoModal')"
        >
          Upload New Photo
        </Keycap>
      </div>
      <section class="mt-8 pb-16" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" class="sr-only">Recently viewed</h2>
        <ul
          role="list"
          class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
          <li
            v-for="file in $store.getters['photo/photos']"
            :key="file.name"
            class="relative"
          >
            <div
              :class="[
                file.current
                  ? 'ring-2 ring-offset-2 ring-indigo-500'
                  : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500',
                'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden',
              ]"
            >
              <img
                :src="file.uri"
                alt=""
                :class="[
                  file.current ? '' : 'group-hover:opacity-75',
                  'object-cover pointer-events-none',
                ]"
              />
              <button type="button" class="absolute inset-0 focus:outline-none">
                <span class="sr-only">View details for {{ file.name }}</span>
              </button>
            </div>
            <p
              class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900"
            >
              {{ file.name }}
            </p>
            <p
              class="pointer-events-none block text-sm font-medium text-gray-500"
            >
              {{ file.description }}
            </p>
          </li>
        </ul>
      </section>
      <pre>{{ $store.getters['photo/photos'] }}</pre>
    </div>
  </div>
</template>
