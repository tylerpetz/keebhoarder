<script>
import { formatter } from '@/utils/methods'

export default {
  name: 'SingleItem',
  beforeRouteLeave(to, from, next) {
    this.$store.commit('item/SET_CURRENT_ITEM', {})
    next()
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
  <div v-if="currentItem" class="h-full p-3">
    <!-- <pre class="p-4 border-theme-border bg-theme-bg-d text-theme-text">{{
      currentItem
    }}</pre> -->
    <div class="flex flex-col">
      <div class="p-6 bg-theme-bg-d mb-4 flex flex-col rounded shadow">
        <div class="flex flex-row justify-between items-center">
          <div>
            <h3
              class="
                text-xl
                leading-6
                font-medium
                text-theme-text
                flex
                items-center
              "
            >
              {{ currentItem.name }}

              <span
                class="
                  ml-2
                  inline-flex
                  items-center
                  px-2.5
                  py-0.5
                  rounded-full
                  text-xs
                  font-medium
                  bg-gray-100
                  text-gray-800
                "
              >
                {{ currentItem.public ? 'Public' : 'Private' }}
              </span>
              <span
                class="
                  ml-2
                  inline-flex
                  items-center
                  px-2.5
                  py-0.5
                  rounded-full
                  text-xs
                  font-medium
                  bg-gray-100
                  text-gray-800
                "
              >
                {{ currentItem.owned ? 'Owned' : 'I Want This' }}
              </span>
            </h3>
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
        <!-- <div class="flex flex-row">
          <div class="w-1/2">
            <img
              v-for="img in currentItem.photos"
              :key="img"
              :src="img"
              :alt="currentItem.name"
              class="max-h-96"
            />
          </div>
        </div> -->
      </div>

      <div
        class="
          max-w-2xl
          mx-auto
          pt-10
          pb-16
          px-4
          sm:px-6
          lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8
        "
      >
        <div class="py-10 lg:pt-6 lg:pb-16">
          <h1
            class="
              text-2xl
              font-extrabold
              tracking-tight
              text-gray-900
              sm:text-3xl
            "
          >
            {{ currentItem.name }}
          </h1>

          <div class="mt-4 lg:mt-0 lg:row-span-3">
            <p class="text-3xl text-gray-900">{{ formattedPrice }}</p>
          </div>
          <!-- Description and details -->
          <div>
            <h3 class="text-sm font-medium text-gray-900">Description</h3>

            <div class="space-y-6">
              <p class="text-base text-gray-900">
                {{ currentItem.description }}
              </p>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Details</h3>

            <div class="mt-4">
              <ul role="list" class="pl-4 list-disc text-sm space-y-2">
                <li class="text-gray-400">
                  <span class="text-gray-600"
                    >Maker: {{ currentItem.maker }}</span
                  >
                </li>

                <li class="text-gray-400">
                  <span class="text-gray-600"
                    >Model: {{ currentItem.model }}</span
                  >
                </li>

                <li class="text-gray-400">
                  <span class="text-gray-600"
                    >Color: {{ currentItem.color }}</span
                  >
                </li>

                <li class="text-gray-400">
                  <span class="text-gray-600"
                    >Quantity: {{ currentItem.qty }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
