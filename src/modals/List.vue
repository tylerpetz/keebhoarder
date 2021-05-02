<script>
export default {
  name: 'List',
  props: {
    list: {
      type: Object,
      required: false,
      default: () => {}
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
    this.currentList = this.list
  }
}
</script>

<template>
  <Modal
    @close="$emit('close')"
  >
    <div class="flex flex-col p-6 items-center">
      <FormInput
        v-model="currentList.name"
        class="w-full mb-6"
        type="text"
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
      <input
        type="checkbox"
        placeholder="Make List Public"
        value="1"
      >
    </div>
    <footer
      slot="footer"
      class="p-2 flex justify-end"
    >
      <Keycap
        theme="accent"
        cap-style="large"
        class="capitalize"
        @click.native="$emit('close')"
      >
        &#10229; Save List
      </Keycap>
    </footer>
  </Modal>
</template>
