<script>
import listColumns from '@/tables/listColumns.js'

export default {
  name: 'Lists',
  middleware: ['loggedIn'],
  data() {
    return {
      columns: listColumns,
    }
  },
  async mounted() {
    await this.$store.dispatch('list/getLists')
  },
  methods: {
    editList(listId) {
      const listToEdit = this.$store.getters['list/lists'].findIndex(
        (list) => list.id === listId
      )
      this.$showModal('ListModal', {
        props: { list: this.$store.getters['list/lists'][listToEdit] },
      })
    },
    removeList({ id }) {
      this.$store.dispatch('list/deleteList', id)
    },
  },
}
</script>

<template>
  <div class="h-full p-3">
    <div class="flex flex-col">
      <div
        class="p-6 bg-theme-bg-d mb-8 flex flex-row justify-between items-center rounded shadow"
      >
        <h3 class="text-xl leading-6 font-medium text-theme-text">Lists</h3>
        <Keycap
          theme="mod"
          cap-style="large"
          type="button"
          @click.native="$showModal('ListModal')"
        >
          Create New List
        </Keycap>
      </div>
      <client-only>
        <vue-good-table
          :columns="columns"
          :is-loading="$store.getters['list/loading']"
          :pagination-options="{
            enabled: true,
            perPageDropdown: [5, 10, 20],
            perPageDropdownEnabled: $store.getters['list/totalResults'] >= 5,
            dropdownAllowAll: false,
            rowsPerPageLabel: 'Lists per page',
          }"
          :rows="$store.getters['list/lists']"
          :total-rows="$store.getters['list/totalResults']"
          mode="remote"
          @on-page-change="$store.dispatch('list/onPagingChange', $event)"
          @on-per-page-change="$store.dispatch('list/onPagingChange', $event)"
          @on-search="$store.dispatch('list/onSearch', $event)"
          @on-sort-change="$store.dispatch('list/onSortChange', $event)"
        >
          <template slot="table-row" slot-scope="props">
            <nuxt-link
              v-if="props.column.field == 'name'"
              :to="{ name: 'lists-id', params: { id: props.row.id } }"
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
                data-test="edit-list"
                @click="editList(props.row.id)"
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
                data-test="delete-list"
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
            <span v-else-if="props.column.field == 'items'">
              {{ props.formattedRow[props.column.field].length }}
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
          <div slot="emptystate" class="text-center">There are no lists.</div>
        </vue-good-table>
      </client-only>
      <!-- <div class="p-6 bg-theme-bg-d mt-8 flex flex-row justify-end items-start rounded shadow">
        <Keycap
          theme="mod"
          cap-style="large"
          type="button"
          @click.native="$showModal('ListModal')"
        >
          Update Table Options
        </Keycap>
      </div> -->
    </div>
  </div>
</template>
