<script>
import ItemTable from '@/tables/ItemTable'

export default {
  name: 'SingleList',
  components: {
    ItemTable,
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('list/SET_CURRENT_LIST', {})
    next()
  },
  async mounted() {
    await this.$store.dispatch('list/getListById', this.$route.params.id)
  },
}
</script>

<template>
  <div v-if="$store.getters['list/currentList']" class="h-full p-3">
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
        <div>
          <h3
            class="
              text-xl
              leading-6
              font-medium
              text-theme-text
              flex
              items-center
            "
          >
            {{ $store.getters['list/currentList'].name }}

            <span
              class="
                ml-2
                inline-flex
                items-center
                px-2.5
                py-0.5
                rounded-full
                text-xs
                font-medium
                bg-gray-100
                text-gray-800
              "
            >
              {{
                $store.getters['list/currentList'].public ? 'Public' : 'Private'
              }}
            </span>
          </h3>
          <p class="mt-2 max-w-lg text-sm text-theme-text">
            {{ $store.getters['list/currentList'].description }}
          </p>
        </div>
        <div class="flex space-x-4">
          <Keycap
            cap-style="large"
            type="button"
            @click.native="
              $showModal('ListModal', {
                props: { list: $store.getters['list/currentList'] },
              })
            "
          >
            Edit {{ $store.getters['list/currentList'].name }}
          </Keycap>
          <Keycap
            theme="mod"
            cap-style="large"
            type="button"
            @click.native="
              $showModal('ItemModal', {
                props: { listId: $store.getters['list/currentList'].id },
              })
            "
          >
            Add Item to {{ $store.getters['list/currentList'].name }}
          </Keycap>
        </div>
      </div>
      <item-table
        :items="$store.getters['list/currentList'].items"
        :list-id="$store.getters['list/currentList'].id"
      />
    </div>
  </div>
</template>
