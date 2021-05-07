<script>
export default {
  name: 'SingleItem',
  beforeRouteLeave (to, from, next) {
    this.$store.commit('item/SET_CURRENT_ITEM', {})
    next()
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$store.dispatch('item/getItemById', this.id)
  },
  methods: {
    editItem (item) {
      this.$showModal('ItemModal', { props: { item } })
    },
    removeItem ({ id }) {
      this.$store.dispatch('item/deleteItem', id)
    }
  }
}
</script>

<template>
  <div
    v-if="$store.getters['item/currentItem']"
    class="h-full p-3"
  >
    <div class="flex flex-col">
      <div class="p-6 bg-theme-bg-d mb-4 flex flex-row justify-between items-center rounded shadow">
        <div>
          <h3 class="text-xl leading-6 font-medium text-theme-text flex items-center">
            {{ $store.getters['item/currentItem'].name }}

            <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {{ $store.getters['item/currentItem'].public ? 'Public' : 'Private' }}
            </span>
          </h3>
          <p class="mt-2 max-w-lg text-sm text-theme-text">
            {{ $store.getters['item/currentItem'].description }}
          </p>
        </div>
        <Keycap
          theme="mod"
          cap-style="large"
          type="button"
          @click.native="$showModal('Item', { props: { item: $store.getters['item/currentItem'] }})"
        >
          Edit {{ $store.getters['item/currentItem'].name }}
        </Keycap>
      </div>
      <pre class="text-theme-text">{{ $store.getters['item/currentItem'] }}</pre>
    </div>
  </div>
</template>
