<script>
import IsPublic from '@/components/IsPublic'
import listColumns from '@/tables/listColumns.js'

export default {
  name: 'Lists',
  components: {
    IsPublic
  },
  data () {
    return {
      columns: listColumns
    }
  },
  computed: {
    isLoading: {
      get () {
        return this.$store.getters['list/loading']
      },
      set (value) {
        this.$store.commit('list/SET_LOADING', value)
      }
    }
  },
  mounted () {
    this.$store.dispatch('list/getLists')
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
  <div class="h-full p-3">
    <div class="flex flex-col">
      <div class="p-6 bg-theme-bg-d mb-4 flex flex-row justify-between items-start rounded shadow">
        <div>
          <h3 class="text-lg leading-6 font-medium text-theme-text">
            Lists
          </h3>
          <p class="mt-2 max-w-lg text-sm text-theme-text">
            Lists are the simplest way to organize your collection. Try creating a list for items you already own, and a wishlist for your financial advisor.
          </p>
        </div>
        <Keycap
          theme="mod"
          cap-style="large"
          type="button"
          @click.native="$showModal('ListModal')"
        >
          Create New List
        </Keycap>
      </div>
      <vue-good-table
        :columns="columns"
        :is-loading.sync="isLoading"
        :pagination-options="{ enabled: true, perPageDropdown: [5, 10, 20] }"
        :rows="$store.getters['list/lists']"
        :total-rows="$store.getters['list/totalResults']"
        mode="remote"
        style-class="vgt-table striped"
        @on-page-change="$store.dispatch('list/onPagingChange', $event)"
        @on-per-page-change="$store.dispatch('list/onPagingChange', $event)"
        @on-search="$store.dispatch('list/onSearch', $event)"
        @on-sort-change="$store.dispatch('list/onSortChange', $event)"
      >
        <template
          slot="table-row"
          slot-scope="props"
        >
          <router-link
            v-if="props.column.field == 'name'"
            :to="{ name: 'SingleList', params: { id: props.row.id } }"
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
      <div class="p-6 bg-theme-bg-d mt-4 flex flex-row justify-end items-start rounded shadow">
        <Keycap
          theme="mod"
          cap-style="large"
          type="button"
          @click.native="$showModal('ListModal')"
        >
          Update Table Options
        </Keycap>
      </div>
    </div>
  </div>
</template>
