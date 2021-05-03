<script>
import IsPublic from '@/components/IsPublic'

export default {
  name: 'Lists',
  components: {
    IsPublic
  },
  mounted () {
    this.$store.dispatch('list/getLists')
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
  <div class="h-full p-3">
    <div class="flex flex-col">
      <div class="p-6 bg-theme-bg-d mb-4 flex flex-row justify-between items-center rounded shadow">
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
          @click.native="$showModal('List')"
        >
          Create New List
        </Keycap>
      </div>
      <div class="overflow-x-auto">
        <div class="py-2 align-middle inline-block min-w-full">
          <div class="overflow-hidden rounded shadow">
            <table class="min-w-full">
              <thead class="text-theme-text-l bg-theme-bg-d">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium"
                  >
                    Public
                  </th>
                  <!-- <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium"
                  >
                    Total Items
                  </th> -->
                  <th
                    scope="col"
                    class="relative px-6 py-3"
                  >
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="list in $store.getters['list/lists']"
                  :key="list.id"
                  class="bg-theme-bg-l text-theme-text"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <router-link
                      :to="{ name: 'SingleList', params: { id: list.id } }"
                      class="text-theme-link hover:text-theme-link-hover"
                    >
                      {{ list.name }}
                    </router-link>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ list.description }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <is-public :is-public="list.public" />
                  </td>
                  <!-- <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ list.count }}
                  </td> -->
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="inline-flex space-x-2">
                      <button
                        type="button"
                        class="text-theme-link hover:text-theme-link-hover"
                        @click="editList(list)"
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
                        @click="removeList(list)"
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
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
