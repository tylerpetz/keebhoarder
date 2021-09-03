<script>
import ItemTable from '@/tables/ItemTable'

export default {
  name: 'Items',
  components: {
    ItemTable,
  },
  async fetch() {
    await this.$store.dispatch('item/getItems')
  },
}
</script>

<template>
  <div class="h-full p-3">
    <div class="flex flex-col">
      <div
        class="
          p-6
          bg-theme-bg-d
          mb-8
          flex flex-row
          justify-between
          items-center
          rounded
          shadow
        "
      >
        <h3 class="text-xl leading-6 font-medium text-theme-text">Items</h3>
        <Keycap
          theme="mod"
          cap-style="large"
          type="button"
          @click.native="$showModal('ItemModal')"
        >
          Create New Item
        </Keycap>
      </div>
      <item-table :items="$store.getters['item/items']" />
    </div>
  </div>
</template>
