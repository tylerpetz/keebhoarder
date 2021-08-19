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
    }
  },
  computed: {
    currentItem() {
      return this.$store.getters['item/currentItem']
    },
    formattedPrice() {
      return formatter.format(this.currentItem.price / 100)
    },
  },
  mounted() {
    this.$store.dispatch('item/getItemById', this.$route.params.id)
  },
  methods: {
    editItem(item) {
      this.$showModal('ItemModal', { props: { item } })
    },
    removeItem({ id }) {
      this.$store.dispatch('item/deleteItem', id)
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
      <div class="mt-8 py-10 lg:pt-6 lg:pb-16 flex flex-row space-x-8">
        <div class="w-1/4">
          <p class="text-3xl text-theme-link mb-4">{{ formattedPrice }}</p>
          <p class="text-xs text-theme-text">
            {{ (currentItem.price / 100).toFixed(2) }} x {{ currentItem.qty }}
          </p>
          <p class="text-[10px] italic text-theme-text">Price x Qty</p>
        </div>

        <div v-if="currentItem.description" class="w-1/4">
          <h3 class="text-sm font-medium text-theme-text-d">Description</h3>
          <p class="text-base text-theme-text">
            {{ currentItem.description }}
          </p>
        </div>

        <div class="w-1/4">
          <h3 class="text-sm font-medium text-theme-text-d">Details</h3>

          <ul role="list" class="mt-4 list-none text-sm space-y-2">
            <li class="text-theme-text">Maker: {{ currentItem.maker }}</li>
            <li class="text-theme-text">Model: {{ currentItem.model }}</li>
            <li class="text-theme-text">Color: {{ currentItem.color }}</li>
          </ul>
        </div>

        <div class="w-1/4">
          <h3 class="text-sm font-medium text-theme-text-d">More Info</h3>

          <ul role="list" class="mt-4 list-none text-sm space-y-2">
            <li
              v-for="url in currentItem.urls"
              :key="url"
              class="
                text-theme-text
                whitespace-nowrap
                overflow-hidden overflow-ellipsis
                w-[288px]
              "
            >
              <a :href="url" target="_blank" class="underline">{{ url }}</a>
            </li>
          </ul>

          <h3 class="text-sm font-medium text-theme-text-d">
            Belongs to Lists
          </h3>

          <ul role="list" class="mt-4 list-none text-sm space-y-2">
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
      <Keycap
        cap-style="large"
        type="button"
        @click.native="showData = !showData"
      >
        {{ showData ? 'Hide' : 'View' }} Source Code
      </Keycap>
      <pre
        v-if="showData"
        class="p-4 border-theme-border bg-theme-bg-d text-theme-text text-xs"
        >{{ currentItem }}</pre
      >
    </div>
  </div>
</template>
