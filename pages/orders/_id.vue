<script>
import ItemTable from '@/tables/ItemTable'

export default {
  name: 'SingleOrder',
  components: {
    ItemTable,
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('order/SET_CURRENT_ORDER', {})
    next()
  },
  async fetch() {
    await this.$store.dispatch('order/getOrderById', this.$route.params.id)
  },
}
</script>

<template>
  <div v-if="$store.getters['order/currentOrder']" class="h-full p-3">
    <div class="flex flex-col">
      <div
        class="
          p-6
          bg-theme-bg-d
          mb-8
          flex flex-row
          justify-between
          items-center
          rounded
          shadow
        "
      >
        <div>
          <h3
            class="
              text-xl
              leading-6
              font-medium
              text-theme-text
              flex
              items-center
            "
          >
            {{ $store.getters['order/currentOrder'].name }}

            <span
              class="
                ml-2
                inline-flex
                items-center
                px-2.5
                py-0.5
                rounded-full
                text-xs
                font-medium
                bg-gray-100
                text-gray-800
              "
            >
              {{
                $store.getters['order/currentOrder'].public
                  ? 'Public'
                  : 'Private'
              }}
            </span>
          </h3>
          <p class="mt-2 max-w-lg text-sm text-theme-text">
            {{ $store.getters['order/currentOrder'].description }}
          </p>
        </div>
        <div class="flex space-x-4">
          <Keycap
            cap-style="large"
            type="button"
            @click.native="
              $showModal('OrderModal', {
                props: { order: $store.getters['order/currentOrder'] },
              })
            "
          >
            Edit {{ $store.getters['order/currentOrder'].name }}
          </Keycap>
          <Keycap
            theme="mod"
            cap-style="large"
            type="button"
            @click.native="
              $showModal('ItemModal', {
                props: { orderId: $store.getters['order/currentOrder'].id },
              })
            "
          >
            Add Item to {{ $store.getters['order/currentOrder'].name }}
          </Keycap>
        </div>
      </div>
      <item-table
        :items="$store.getters['order/currentOrder'].items"
        :order-id="$store.getters['order/currentOrder'].id"
      />
    </div>
  </div>
</template>
