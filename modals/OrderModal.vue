<script>
export default {
  name: 'OrderModal',
  props: {
    order: {
      type: [Object, null],
      required: false,
      default: () => null,
    },
  },
  data() {
    return {
      currentOrder: {
        name: '',
        description: '',
        public: false,
      },
    }
  },
  mounted() {
    if (this.order) {
      this.currentOrder = { ...this.order }
    }
  },
  methods: {
    createOrUpdateOrder() {
      if (this.order) {
        this.$store.dispatch('order/updateOrder', {
          order: this.currentOrder,
          updateCurrent: this.$route.name === 'SingleOrder',
        })
      } else {
        this.$store.dispatch('order/createOrder', this.currentOrder)
      }
      this.$closeModal()
    },
  },
}
</script>

<template>
  <Modal @close="$closeModal">
    <form @submit.prevent="createOrUpdateOrder">
      <div class="flex flex-col p-6">
        <form-input
          v-model="currentOrder.name"
          class="w-full mb-6"
          type="text"
          required
        >
          Name *
        </form-input>
        <form-input
          v-model="currentOrder.description"
          class="w-full mb-6"
          type="text"
        >
          Description
        </form-input>
        <div class="relative flex items-start justify-start pb-1">
          <form-toggle v-model="currentOrder.public">
            <p class="font-medium text-theme-text text-sm">Public</p>
            <p class="text-theme-text-l text-xs">
              Allow other users to see this order.
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
        >
          &#10229; Save Order
        </Keycap>
      </footer>
    </form>
  </Modal>
</template>
