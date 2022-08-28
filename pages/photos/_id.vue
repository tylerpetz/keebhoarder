<script>
import { formatter } from '@/utils/methods'

export default {
  name: 'SingleItem',
  beforeRouteLeave(to, from, next) {
    this.$store.commit('item/SET_CURRENT_ITEM', {})
    next()
  },
  data() {
    return {
      showData: false,
      newListId: '',
      lists: [],
    }
  },
  async fetch() {
    await this.$store.dispatch('item/getItemById', this.$route.params.id)
  },
  computed: {
    currentItem() {
      return this.$store.getters['item/currentItem']
    },
    formattedPrice() {
      return formatter.format(this.currentItem.price / 100)
    },
    dropdownOptions() {
      return [
        { text: '', value: '' },
        ...this.lists
          .filter((list) => list.id !== this.currentItem.list?.id)
          .map((list) => ({
            text: list.name,
            value: list.id,
          })),
      ]
    },
  },
  mounted() {
    this.$store.dispatch('list/getListsForDropdown').then((lists) => {
      this.lists = lists
    })
  },
  methods: {
    editItem(item) {
      this.$showModal('ItemModal', { props: { item } })
    },
    removeItem({ id }) {
      this.$store.dispatch('item/deleteItem', id)
    },
    async saveItemToList() {
      await this.$store.dispatch('item/addItemToList', {
        itemId: this.currentItem.id,
        listId: this.newListId,
      })
      this.newListId = ''
      this.$store.dispatch('item/getItemById', this.$route.params.id)
    },
    async removeItemFromList(listId) {
      await this.$store.dispatch('item/deleteItemFromList', {
        itemId: this.currentItem.id,
        listId,
      })
      this.$store.dispatch('item/getItemById', this.$route.params.id)
    },
  },
}
</script>

<template>
  <div v-if="currentItem" class="h-full p-3 flex flex-col items-center">
    <div class="pt-8 w-full max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div
        class="mb-8 flex flex-row items-center justify-between space-x-8 text-theme-text"
      >
        <div>
          <h1 class="text-2xl sm:text-3xl">
            {{ currentItem.name }}
          </h1>
          <p class="text-sm">{{ currentItem.category.join(', ') }}</p>
        </div>
        <div class="flex flex-row items-center space-x-8">
          <is-public :is-public="currentItem.public" />
          <p class="text-xs font-medium">
            {{ currentItem.owned ? 'Owned' : 'I Want This' }}
          </p>
        </div>
      </div>

      <PhotoDisplay :photos="currentItem.photos || []" />
      <div
        class="mt-8 py-10 lg:pt-6 lg:pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <DataSection title="Price">
          <p class="text-3xl text-theme-link mb-4">{{ formattedPrice }}</p>
          <p class="text-xs text-theme-text">
            {{ (currentItem.price / 100).toFixed(2) }} x {{ currentItem.qty }}
          </p>
          <p class="text-[10px] italic text-theme-text">Price x Qty</p>
        </DataSection>

        <div>
          <DataSection
            v-if="currentItem.description"
            title="Description"
            class="mb-10"
          >
            <p class="text-sm text-theme-text">
              {{ currentItem.description }}
            </p>
          </DataSection>
          <DataSection title="Details">
            <ul role="list" class="list-none text-sm space-y-2">
              <li class="text-theme-text">Maker: {{ currentItem.maker }}</li>
              <li class="text-theme-text">Model: {{ currentItem.model }}</li>
              <li class="text-theme-text">Color: {{ currentItem.color }}</li>
            </ul>
          </DataSection>
        </div>

        <div>
          <DataSection title="More Info" class="mb-10">
            <ul role="list" class="list-none text-sm space-y-2">
              <li
                v-for="url in currentItem.urls"
                :key="url"
                class="text-theme-text whitespace-nowrap overflow-hidden overflow-ellipsis w-full"
              >
                <a :href="url" target="_blank" class="underline">{{ url }}</a>
              </li>
            </ul>
          </DataSection>

          <DataSection title="Belongs to Lists">
            <div
              v-if="currentItem.list"
              role="list"
              class="mt-4 list-none text-sm space-y-2"
            >
              <nuxt-link
                :to="{ name: 'lists-id', params: { id: currentItem.list.id } }"
                class="underline text-theme-text whitespace-nowrap overflow-hidden overflow-ellipsis w-[288px]"
                role="listitem"
              >
                {{ currentItem.list.name }}
              </nuxt-link>
              <button
                type="button"
                class="text-theme-link hover:text-theme-link-hover"
                aria-label="remove item from list"
                @click="removeItemFromList(currentItem.list.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
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
            <p v-else class="text-sm text-theme-text-l">
              {{ currentItem.name }} isn't on any lists.
            </p>

            <FormSelect
              v-model="newListId"
              class="mt-8"
              :options="dropdownOptions"
            >
              Add {{ currentItem.name }} to a List
            </FormSelect>
            <Keycap v-if="newListId" @click.native="newListId = ''">
              Cancel
            </Keycap>
            <Keycap
              v-if="newListId"
              theme="accent"
              @click.native="saveItemToList"
            >
              Save
            </Keycap>
          </DataSection>
        </div>
      </div>
      <Keycap
        theme="mod"
        cap-style="large"
        type="button"
        @click.native="
          $showModal('ItemModal', { props: { item: currentItem } })
        "
      >
        Edit {{ currentItem.name }}
      </Keycap>
    </div>
  </div>
</template>
