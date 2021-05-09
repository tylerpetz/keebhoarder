<script>
export default {
  name: 'ListModal',
  props: {
    list: {
      type: [Object, null],
      required: false,
      default: () => null
    }
  },
  data () {
    return {
      currentList: {
        name: '',
        description: '',
        public: false
      }
    }
  },
  mounted () {
    if (this.list) {
      this.currentList = { ...this.list }
    }
  },
  methods: {
    createOrUpdateList () {
      if (this.list) {
        this.$store.dispatch('list/updateList', { list: this.currentList, updateCurrent: this.$route.name === 'SingleList' })
      } else {
        this.$store.dispatch('list/createList', this.currentList)
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
    <form @submit.prevent="createOrUpdateList">
      <div class="flex flex-col p-6">
        <FormInput
          v-model="currentList.name"
          class="w-full mb-6"
          type="text"
          required
        >
          Name *
        </FormInput>
        <FormInput
          v-model="currentList.description"
          class="w-full mb-6"
          type="text"
        >
          Description
        </FormInput>
        <div class="relative flex items-start justify-start">
          <div class="flex items-center h-6">
            <input
              id="isPublic"
              v-model="currentList.public"
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
              Allow other users to see this list.
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
          &#10229; Save List
        </Keycap>
      </footer>
    </form>
  </Modal>
</template>
