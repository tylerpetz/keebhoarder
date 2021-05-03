<script>
export default {
  name: 'List',
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
        this.$store.dispatch('list/updateList', this.currentList)
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
    <form @submit="createOrUpdateList">
      <div class="flex flex-col p-6 items-center">
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
        <label>
          <input
            v-model="currentList.public"
            type="checkbox"
          >
          Make List Public
        </label>
      </div>
      <footer
        slot="footer"
        class="p-2 flex justify-end"
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
