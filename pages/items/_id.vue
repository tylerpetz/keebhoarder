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
        ...this.lists.map((list) => ({
          text: list.name,
          value: list.id,
        })),
      ]
    },
  },
  mounted() {
    this.$store.dispatch('item/getItemById', this.$route.params.id)
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
  },
}
</script>

<template>
  <div v-if="currentItem" class="h-full p-3 flex flex-col items-center">
    <div class="pt-8 w-full max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div
        class="
          mb-8
          flex flex-row
          items-center
          justify-between
          space-x-8
          text-theme-text
        "
      >
        <div>
          <h1 class="text-2xl sm:text-3xl">
            {{ currentItem.name }}
          </h1>
          <p class="text-sm">{{ currentItem.category }}</p>
        </div>
        <div class="flex flex-row items-center space-x-8">
          <is-public :is-public="currentItem.public" />
          <p class="text-xs font-medium">
            {{ currentItem.owned ? 'Owned' : 'I Want This' }}
          </p>
        </div>
      </div>

      <PhotoDisplay :photos="currentItem.photos" />
      <div
        class="
          mt-8
          py-10
          lg:pt-6 lg:pb-16
          grid grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
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
                class="
                  text-theme-text
                  whitespace-nowrap
                  overflow-hidden overflow-ellipsis
                  w-full
                "
              >
                <a :href="url" target="_blank" class="underline">{{ url }}</a>
              </li>
            </ul>
          </DataSection>

          <DataSection title="Belongs to Lists">
            <ul
              v-if="currentItem.lists && currentItem.lists.length"
              role="list"
              class="mt-4 list-none text-sm space-y-2"
            >
              <li
                v-for="list in currentItem.lists"
                :key="list.id"
                class="
                  text-theme-text
                  whitespace-nowrap
                  overflow-hidden overflow-ellipsis
                  w-[288px]
                "
              >
                <nuxt-link
                  :to="{ name: 'lists-id', params: { id: list.id } }"
                  class="underline"
                >
                  {{ list.name }}
                </nuxt-link>
              </li>
            </ul>
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
