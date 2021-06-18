<script>
import itemColumns from '@/tables/itemColumns.js'

export default {
  name: 'ItemTable',
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    listId: {
      type: [String, null],
      default: null,
    },
  },
  data() {
    return {
      columns: itemColumns,
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.$store.getters['item/loading']
      },
      set(value) {
        this.$store.commit('item/SET_LOADING', value)
      },
    },
    paginationOptions() {
      return {
        enabled: true,
        perPageDropdown: [5, 10, 20],
        dropdownAllowAll: false,
        rowsPerPageLabel: 'Items per page',
      }
    },
    totalRows() {
      return this.listId
        ? this.items.length
        : this.$store.getters['item/totalResults']
    },
  },
  methods: {
    editItem(item) {
      this.$showModal('ItemModal', { props: { item } })
    },
    removeItem({ id }) {
      this.$store.dispatch('item/deleteItem', id)
    },
    onPageChange(params) {
      this.$store.dispatch('item/onPagingChange', params)
    },
    onPerPageChange(params) {
      this.$store.dispatch('item/onPagingChange', params)
    },
    onSearch(params) {
      this.$store.dispatch('item/onSearch', params)
    },
    onSortChange(params) {
      this.$store.dispatch('item/onSortChange', params)
    },
  },
}
</script>

<template>
  <vue-good-table
    :columns="columns"
    :is-loading.sync="isLoading"
    :pagination-options="paginationOptions"
    :rows="items"
    :total-rows="totalRows"
    mode="remote"
    @on-page-change="onPageChange"
    @on-per-page-change="onPerPageChange"
    @on-search="onSearch"
    @on-sort-change="onSortChange"
  >
    <template slot="table-row" slot-scope="props">
      <nuxt-link
        v-if="props.column.field == 'name'"
        :to="{ name: 'items-id', params: { id: props.row.id } }"
        class="text-theme-link hover:text-theme-link-hover"
      >
        {{ props.row.name }}
      </nuxt-link>
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
          @click="editItem(props.row)"
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
          @click="removeItem(props.row)"
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
    <div slot="emptystate" class="text-center">
      There are no items{{ listId ? ' on this list' : '.' }}
    </div>
  </vue-good-table>
</template>
