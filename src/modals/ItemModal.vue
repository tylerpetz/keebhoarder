<script>
import { getValue } from 'vue-currency-input'

export default {
  name: 'ItemModal',
  props: {
    item: {
      type: [Object, null],
      required: false,
      default: () => null
    },
    listId: {
      type: [String, null],
      required: false,
      default: () => null
    }
  },
  data () {
    return {
      currentItem: {
        name: '',
        description: '',
        category: 'Uncategorized',
        price: 0,
        qty: 0,
        public: false,
        photos: [''],
        urls: [''],
        details: {
          maker: '',
          model: '',
          color: ''
        }
      },
      formattedPrice: 0
    }
  },
  computed: {
    categories () {
      const categories = [
        'Uncategorized',
        'Keyboard',
        'Keycap Set',
        'Case',
        'Switches',
        'Artisan Keycap',
        'Cable',
        'Deskmat',
        'Lube',
        'Springs',
        'Stabilizers',
        'Other'
      ]
      return categories.map(cat => ({ text: cat, value: cat }))
    }
  },
  watch: {
    formattedPrice () {
      this.currentItem.price = getValue(this.$refs.price)
    }
  },
  mounted () {
    if (this.item) {
      this.currentItem = { ...this.item }
    }
  },
  methods: {
    createOrUpdateItem () {
      if (this.item) {
        this.$store.dispatch('item/updateItem', { item: this.currentItem, updateCurrent: this.$route.name === 'SingleItem' })
      } else {
        this.$store.dispatch('item/createItem', { ...this.currentItem, ...this.listId && { lists: [this.listId] } })
      }
      this.$closeModal()
    }
  }
}
</script>

<template>
  <Modal
    modal-class="w-10/12 md:w-2/3 max-h-full"
    @close="$closeModal"
  >
    <form @submit.prevent="createOrUpdateItem">
      <div class="flex flex-row w-full space-x-6 p-6">
        <div class="w-1/3">
          <form-input
            v-model="currentItem.name"
            class="w-full mb-6"
            type="text"
            required
          >
            Name *
          </form-input>

          <form-input
            v-model="currentItem.description"
            class="w-full mb-6"
            type="text"
          >
            Description
          </form-input>
          <form-input
            ref="price"
            v-model="formattedPrice"
            v-currency
            class="w-full mb-6"
            type="text"
            required
          >
            Price
          </form-input>
          <form-input
            v-model="currentItem.qty"
            class="w-full mb-6"
            type="number"
            required
          >
            Qty
          </form-input>
          <form-toggle v-model="currentItem.public">
            <p class="font-medium text-theme-text text-sm">
              Public
            </p>
            <p class="text-theme-text-l text-xs">
              Allow other users to see this item.
            </p>
          </form-toggle>
        </div>
        <div class="w-1/3">
          <form-select
            v-model="currentItem.category"
            :options="categories"
            class="mb-6"
          >
            Category
          </form-select>
          <form-input
            v-model="currentItem.details.maker"
            class="w-full mb-6"
            type="text"
          >
            Manufacturer
          </form-input>
          <form-input
            v-model="currentItem.details.model"
            class="w-full mb-6"
            type="text"
          >
            Model Name
          </form-input>
          <form-input
            v-model="currentItem.details.color"
            class="w-full mb-6"
            type="text"
          >
            Color
          </form-input>
        </div>
        <div class="w-1/3">
          <div class="relative flex flex-col mb-2">
            <span class="text-theme-text text-xs">Additional Links</span>
            <template v-for="(url, index) in currentItem.urls">
              <form-input
                :key="index"
                v-model="currentItem.urls[index]"
                type="text"
                :class="{ 'mt-2': index > 0 }"
              >
                <template
                  v-if="index > 0"
                  slot="icon"
                >
                  <button
                    class="appearance-none"
                    type="button"
                    @click="currentItem.urls.splice(index, 1)"
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
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </template>
              </form-input>
            </template>
          </div>
          <div class="flex justify-end w-full text-right">
            <Keycap
              cap-style="large"
              type="button"
              @click.native="currentItem.urls.push('')"
            >
              Add URL
            </Keycap>
          </div>
          <div class="relative flex flex-col mb-6">
            <span class="text-theme-text text-xs">Photos</span>
            <template v-for="(photo, index) in currentItem.photos">
              <form-input
                :key="index"
                v-model="currentItem.photos[index]"
                type="text"
                :class="{ 'mt-2': index > 0 }"
              >
                <template
                  v-if="index > 0"
                  slot="icon"
                >
                  <button
                    class="appearance-none"
                    type="button"
                    @click="currentItem.photos.splice(index, 1)"
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
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </template>
              </form-input>
            </template>
          </div>

          <div class="flex space-x-4 justify-end w-full text-right">
            <Keycap
              cap-style="large"
              type="button"
              @click.native="currentItem.photos.push('')"
            >
              Add Photo
            </Keycap>
          </div>
        </div>
      </div>
      <footer
        class="bg-theme-bg-d p-2 flex justify-end"
      >
        <Keycap
          theme="accent"
          cap-style="large"
          class="capitalize"
          type="submit"
        >
          &#10229; Save Item
        </Keycap>
      </footer>
    </form>
  </Modal>
</template>
