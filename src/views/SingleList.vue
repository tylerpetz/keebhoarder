<script>
import IsPublic from '@/components/IsPublic'
import itemColumns from '@/tables/itemColumns.js'

export default {
  name: 'SingleList',
  components: {
    IsPublic
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('list/SET_CURRENT_LIST', {})
    next()
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      columns: itemColumns
    }
  },
  mounted () {
    this.$store.dispatch('list/getListById', this.id)
  },
  methods: {
    editList (list) {
      this.$showModal('ListModal', { props: { list } })
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
          <h3 class="text-xl leading-6 font-medium text-theme-text flex items-center">
            {{ $store.getters['list/currentList'].name }}

            <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {{ $store.getters['list/currentList'].public ? 'Public' : 'Private' }}
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
            @click.native="$showModal('ListModal', { props: { list: $store.getters['list/currentList'] }})"
          >
            Edit {{ $store.getters['list/currentList'].name }}
          </Keycap>
          <Keycap
            theme="mod"
            cap-style="large"
            type="button"
            @click.native="$showModal('ItemModal', { props: { listId: $store.getters['list/currentList']._id }})"
          >
            Add Item to {{ $store.getters['list/currentList'].name }}
          </Keycap>
        </div>
      </div>
      <vue-good-table
        :columns="columns"
        :rows="$store.getters['list/currentList'].items"
      >
        <template
          slot="table-row"
          slot-scope="props"
        >
          <router-link
            v-if="props.column.field == 'name'"
            :to="{ name: 'SingleItem', params: { id: props.row.id } }"
            class="text-theme-link hover:text-theme-link-hover"
          >
            {{ props.row.name }}
          </router-link>
          <is-public
            v-else-if="props.column.field == 'public'"
            :is-public="props.row.public"
          />
          <div
            v-else-if="props.column.field == 'after'"
            class="inline-flex space-x-2"
          >
            <button
              type="button"
              class="text-theme-link hover:text-theme-link-hover"
              @click="editList(props.row)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>

            <button
              type="button"
              class="text-theme-link hover:text-theme-link-hover"
              @click="removeList(props.row)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>
