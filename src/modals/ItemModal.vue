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
      <div class="flex flex-row w-full space-x-4 p-6 pb-0">
        <div class="w-1/2">
          <FormInput
            v-model="currentItem.name"
            class="w-full mb-6"
            type="text"
            required
          >
            Name *
          </FormInput>
          <FormInput
            v-model="currentItem.description"
            class="w-full mb-6"
            type="text"
          >
            Description
          </FormInput>
          <FormInput
            v-model="currentItem.qty"
            class="w-full mb-6"
            type="number"
            required
          >
            Qty
          </FormInput>
          <FormInput
            ref="price"
            v-model="formattedPrice"
            v-currency
            class="w-full mb-6"
            type="text"
            required
          >
            Price
          </FormInput>
        </div>
        <div class="w-1/2">
          <FormInput
            v-model="currentItem.details.maker"
            class="w-full mb-6"
            type="text"
          >
            Manufacturer
          </FormInput>
          <FormInput
            v-model="currentItem.details.model"
            class="w-full mb-6"
            type="text"
          >
            Model Name
          </FormInput>
          <FormInput
            v-model="currentItem.details.color"
            class="w-full mb-6"
            type="text"
          >
            Color
          </FormInput>
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
      <div class="p-6 pt-0 relative w-full flex items-start justify-start">
        <div class="flex items-center h-6">
          <input
            id="isPublic"
            v-model="currentItem.public"
            type="checkbox"
            class="focus:text-theme-border-press h-4 w-4 text-theme-border border-theme-border rounded"
          >
        </div>
        <div class="ml-3">
          <label
            for="isPublic"
            class="font-medium text-theme-text text-sm"
          >Public</label>
          <p class="text-theme-text-l text-xs">
            Allow other users to see this item.
          </p>
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
