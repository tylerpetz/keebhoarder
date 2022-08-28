<script>
// import ItemTable from '@/tables/ItemTable'

export default {
  name: 'Photos',
  components: {
    // ItemTable,
  },
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
      <pre>{{ $store.getters['photo/photos'] }}</pre>
      <!-- <item-table :items="$store.getters['item/items']" /> -->
    </div>
  </div>
</template>
