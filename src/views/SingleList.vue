<script>

export default {
  name: 'SingleList',
  beforeRouteLeave (to, from, next) {
    this.$store.commit('list/SET_CURRENT_LIST', null)
    next()
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$store.dispatch('list/getListById', this.id)
  },
  methods: {
    editList (list) {
      this.$showModal('List', { props: { list } })
    },
    removeList ({ id }) {
      this.$store.dispatch('list/deleteList', id)
    }
  }
}
</script>

<template>
  <div
    v-if="$store.getters['list/currentList']"
    class="h-full p-3"
  >
    <div class="flex flex-col">
      <div class="p-6 bg-theme-bg-d mb-4 flex flex-row justify-between items-center rounded shadow">
        <div>
          <h3 class="text-xl leading-6 font-medium text-theme-text">
            {{ $store.getters['list/currentList'].name }}

            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 text-2xs">
              {{ $store.getters['list/currentList'].public ? 'Public' : 'Private' }}
            </span>
          </h3>
          <p class="mt-2 max-w-lg text-sm text-theme-text">
            {{ $store.getters['list/currentList'].description }}
          </p>
        </div>
        <Keycap
          theme="mod"
          cap-style="large"
          type="button"
          @click.native="$showModal('List', { props: { list: $store.getters['list/currentList'] }})"
        >
          Edit {{ $store.getters['list/currentList'].name }}
        </Keycap>
      </div>
    </div>
  </div>
</template>
