<script>
export default {
  name: 'ItemModal',
  props: {
    item: {
      type: [Object, null],
      required: false,
      default: () => null
    }
  },
  data () {
    return {
      currentItem: {
        name: '',
        description: '',
        public: false
      }
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
        this.$store.dispatch('item/createItem', this.currentItem)
      }
      this.$closeModal()
    }
  }
}
</script>

<template>
  <Modal
    @close="$closeModal"
  >
    <form @submit.prevent="createOrUpdateItem">
      <div class="flex flex-col p-6">
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
        <div class="relative flex items-start justify-start">
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
