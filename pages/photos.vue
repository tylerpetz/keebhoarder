<script>
import { bytesToSize } from '@/utils/methods'

export default {
  name: 'Photos',
  data() {
    return {
      photos: [],
    }
  },
  async fetch() {
    const { data: photos } = await this.$supabase.storage.from('photos').list()
    this.photos = photos.map((photo) => {
      const { publicURL } = this.$supabase.storage
        .from('photos')
        .getPublicUrl(photo.name)
      return {
        ...photo,
        publicURL,
      }
    })
  },
  methods: {
    getFileSize(file) {
      if (file.metadata && file.metadata.size) {
        return bytesToSize(file.metadata.size)
      } else {
        return '0 Byte'
      }
    },
  },
}
</script>

<template>
  <section class="mt-8 pb-16" aria-labelledby="gallery-heading">
    <h2 id="gallery-heading" class="sr-only">Recently viewed</h2>
    <ul
      role="list"
      class="
        grid grid-cols-2
        gap-x-4 gap-y-8
        sm:grid-cols-3 sm:gap-x-6
        md:grid-cols-4
        lg:grid-cols-4
        xl:grid-cols-6 xl:gap-x-8
      "
    >
      <li v-for="photo in photos" :key="photo.id" class="relative">
        <!-- Current: "ring-2 ring-offset-2 ring-indigo-500", Default: "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500" -->
        <div
          class="
            ring-2 ring-offset-2 ring-indigo-500
            group
            block
            w-full
            aspect-w-10 aspect-h-7
            rounded-lg
            bg-gray-100
            overflow-hidden
          "
        >
          <!-- Current: "", Default: "group-hover:opacity-75" -->
          <img
            :src="photo.publicURL"
            :alt="photo.name"
            class="object-cover pointer-events-none"
          />
          <button type="button" class="absolute inset-0 focus:outline-none">
            <span class="sr-only">View details for IMG_4985.HEIC</span>
          </button>
        </div>
        <p
          class="
            mt-2
            block
            text-sm
            font-medium
            text-gray-900
            truncate
            pointer-events-none
          "
        >
          {{ photo.name }}
        </p>
        <p class="block text-sm font-medium text-gray-500 pointer-events-none">
          {{ getFileSize(photo) }}
        </p>
      </li>

      <!-- More files... -->
    </ul>
  </section>
</template>
