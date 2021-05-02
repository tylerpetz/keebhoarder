<script>
import ListModal from '@/components/ListModal'

export default {
  name: 'Lists',
  components: {
    ListModal
  },
  data () {
    return {
      people: [
        {
          name: 'tyler',
          title: 'baws',
          email: 'tylerpetz@gmail.com',
          role: 'admin'
        },
        {
          name: 'tyler',
          title: 'baws',
          email: 'tylerpetz@gmail.com',
          role: 'admin'
        },
        {
          name: 'tyler',
          title: 'baws',
          email: 'tylerpetz@gmail.com',
          role: 'admin'
        },
        {
          name: 'tyler',
          title: 'baws',
          email: 'tylerpetz@gmail.com',
          role: 'admin'
        }
      ]
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
  }
}
</script>

<template>
  <div class="h-full p-3">
    <div class="flex flex-col">
      <div class="pl-1 ml-1 py-5 border-b border-t border-theme-border mb-4 flex flex-row justify-between items-center">
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
          @click.native="activeModal = 'add-list'"
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
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium"
                  >
                    Total Items
                  </th>
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
                  v-for="person in people"
                  :key="person.email"
                  class="bg-theme-bg-l text-theme-text"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ person.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ person.title }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ person.email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ person.role }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      class="text-theme-link hover:text-theme-link-hover"
                    >Edit</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <list-modal
        v-if="activeModal === 'add-list'"
        @close="activeModal = ''"
      />
    </div>
  </div>
</template>
