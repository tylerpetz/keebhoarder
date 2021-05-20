<script>
import { getValue, setValue } from 'vue-currency-input'
import _isEqual from 'lodash/isEqual'
import _cloneDeep from 'lodash/cloneDeep'

const itemModel = {
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
}

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
      currentItem: itemModel,
      formattedPrice: 0,
      itemChanged: false,
      originalItem: itemModel,
      tempImageUrl: null
    }
  },
  computed: {
    categories () {
      const categories = [
        'Uncategorized',
        'Artisan Keycap',
        'Cable',
        'Case',
        'Deskmat',
        'Keyboard',
        'Keycap Set',
        'Lube',
        'PCB',
        'Springs',
        'Stabilizers',
        'Switches',
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
      this.formattedPrice = setValue(this.$refs.price, getValue(this.$refs.price) + this.item.price)
      this.currentItem = {
        ...itemModel,
        ...this.item
      }
      this.originalItem = _cloneDeep(this.item)
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
    },
    askToClose () {
      if (_isEqual(this.currentItem, this.originalItem)) {
        this.$closeModal()
      } else {
        const choice = confirm('Are you sure you stop adding this item? You will lose any unsaved changes.')
        if (choice) {
          this.$closeModal()
        }
      }
    },
    onFileUpload (e) {
      const file = e.target.files[0]
      this.currentItem.photos[0] = file
      this.tempImageUrl = URL.createObjectURL(file)
    }
  }
}
</script>

<template>
  <Modal
    modal-class="w-11/12 max-w-2xl lg:max-w-none xl:w-10/12 max-h-full"
    :click-bg-to-close="false"
    @close="askToClose"
  >
    <form @submit.prevent="createOrUpdateItem">
      <div class="flex flex-col lg:flex-row w-full space-y-6 lg:space-y-0 lg:space-x-6 p-6">
        <div class="w-full lg:w-1/3">
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
        <div class="w-full lg:w-1/3">
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
        <div class="w-full lg:w-1/3">
          <label
            class="block text-sm font-medium text-theme-text"
          >
            Photos (PNG, JPG, GIF up to 10MB)
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2 mb-6">
            <div class="w-1/3 flex justify-center px-2 pt-4 pb-5 border-2 border-theme-border border-dashed rounded-md relative">
              <img
                v-if="tempImageUrl"
                :src="tempImageUrl"
                class="absolute h-full w-full inset-0 object-contain z-10"
                alt="cover image"
              >
              <div
                class="space-y-1 text-center"
              >
                <svg
                  class="mx-auto h-10 w-10 text-theme-link"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div class="flex flex-col items-center text-xs text-theme-text">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md font-medium text-theme-link hover:text-theme-link focus-within:outline-none focus-within:ring-2 focus-within:ring-theme-link"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      accept="image/*"
                      type="file"
                      class="sr-only"
                      @change="onFileUpload"
                    >
                  </label>
                  <p class="pl-1">
                    or drag and drop
                  </p>
                </div>
              </div>
            </div>
          </div>
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
