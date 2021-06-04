<script>
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
        <div class="flex flex-row">
          <div class="w-1/2">
            <img
              v-for="img in currentItem.photos"
              :key="img"
              :src="img"
              :alt="currentItem.name"
              class="max-h-96"
            />
          </div>
          <div>
            <p class="mt-2 max-w-lg text-sm text-theme-text">
              {{ currentItem.description }}
            </p>
            <p class="mt-4 max-w-lg text-sm text-theme-text">
              Maker: {{ currentItem.details.maker }}<br />Model:
              {{ currentItem.details.model }}<br />
              Color: {{ currentItem.details.color }}<br />Color:
              {{ currentItem.qty }}
            </p>
          </div>
        </div>
      </div>
      <!-- <pre class="text-theme-text">{{ currentItem }}</pre> -->
    </div>
  </div>
</template>
