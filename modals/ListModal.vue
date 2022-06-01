<script>
export default {
  name: 'ListModal',
  props: {
    list: {
      type: [Object, null],
      required: false,
      default: () => null,
    },
  },
  data() {
    return {
      currentList: {
        name: '',
        description: '',
        public: false,
      },
    }
  },
  mounted() {
    if (this.list) {
      this.currentList = { ...this.list }
    }
  },
  methods: {
    createOrUpdateList() {
      if (this.list) {
        this.$store.dispatch('list/updateList', {
          list: this.currentList,
          updateCurrent: this.$route.name === 'lists-id',
        })
      } else {
        this.$store.dispatch('list/createList', this.currentList)
      }
      this.$closeModal()
    },
  },
}
</script>

<template>
  <Modal data-test="list-modal" @close="$closeModal">
    <form @submit.prevent="createOrUpdateList">
      <div class="flex flex-col p-6">
        <form-input
          v-model="currentList.name"
          class="w-full mb-6"
          type="text"
          required
          data-test="list-name"
        >
          Name *
        </form-input>
        <form-input
          v-model="currentList.description"
          class="w-full mb-6"
          type="text"
          data-test="list-description"
        >
          Description
        </form-input>
        <div class="relative flex items-start justify-start pb-1">
          <form-toggle v-model="currentList.public" data-test="list-public">
            <p class="font-medium text-theme-text text-sm">Public</p>
            <p class="text-theme-text-l text-xs">
              Allow other users to see this list.
            </p>
          </form-toggle>
        </div>
      </div>
      <footer class="bg-theme-bg-d p-2 flex justify-end">
        <Keycap
          theme="accent"
          cap-style="large"
          class="capitalize"
          type="submit"
          data-test="list-save-button"
        >
          &#10229; Save List
        </Keycap>
      </footer>
    </form>
  </Modal>
</template>
