<script>
import ListModal from '@/components/ListModal'
import IsPublic from '@/components/IsPublic'
export default {
  name: 'Lists',
  components: {
    ListModal,
    IsPublic
  },
  data () {
    return {
      lists: [],
      activeList: false
    }
  },
  computed: {
    activeModal: {
      get () {
        return this.$store.state.app.activeModal
      },
      set (modal) {
        this.$store.commit('app/SET_ACTIVE_MODAL', modal)
      }
    }
  },
  mounted () {
    this.axios.get('http://localhost:3000/v1/lists?limit=10&page=1').then(({ data }) => {
      this.lists = [...data.results]
    })
  },
  methods: {
    editList (list) {
      this.activeList = list
      this.activeModal = 'list'
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
          @click.native="activeModal = 'list'"
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
                  v-for="list in lists"
                  :key="list.id"
                  class="bg-theme-bg-l text-theme-text"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ list.name }}
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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
      <list-modal
        :list="activeList || null"
        @close="activeModal = ''"
      />
    </div>
  </div>
</template>
