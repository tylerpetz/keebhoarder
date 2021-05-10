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
        price: 0,
        qty: 0,
        public: false,
        photos: [''],
        details: {
          maker: '',
          model: '',
          color: ''
        }
      },
      formattedPrice: 0
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
      <div class="flex flex-row w-full space-x-4 p-6">
        <div class="w-1/2">
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
            v-model="currentItem.qty"
            class="w-full mb-6"
            type="number"
            required
          >
            Qty
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
          <form-toggle v-model="currentItem.public">
            <p class="font-medium text-theme-text text-sm">
              Public
            </p>
            <p class="text-theme-text-l text-xs">
              Allow other users to see this item.
            </p>
          </form-toggle>
        </div>
        <div class="w-1/2">
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
          <div class="relative flex flex-col">
            <span class="text-theme-text text-xs">Photos</span>
            <template v-for="(photo, index) in currentItem.photos">
              <!-- <FormInput
              v-model="currentItem.photos[index]"
              class="w-full mb-6"
            /> -->
              <input
                :key="index"
                type="text"
                class="w-full mb-6 bg-alpha-cap hover:bg-alpha-cap-hover text-alpha-legend-press placeholder-alpha-legend-hover p-2 rounded text-sm"
                @input="currentItem.photos[index]"
              >
            </template>
          </div>
          <div class="w-full text-right">
            <Keycap
              cap-style="large"
              type="button"
              @click.native="currentItem.photos.push('')"
            >
              &#10229; Add Photo
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
