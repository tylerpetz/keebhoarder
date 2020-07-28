<script>
import gql from 'graphql-tag'

export default {
  name: 'Dashboard',
  apollo: {
    // Apollo specific options
    orders: gql`query {
      orders {
        id,
        items {
          id
        }
      }
    }`,
    items: gql`query {
      items {
        id
        price
      }
    }`
  },
  computed: {
    totalPrice () {
      return this.items.reduce((acc, cur) => acc.price + cur.price)
    }
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 h-full">
    <div class="col-span-1 bg-alpha-cap rounded p-4">
      <a href="#" class="block bg-mod-cap text-mod-legend hover:bg-mod-cap-hover hover:text-mod-legend-hover p-2 mb-4 rounded">Orders</a>
      <a href="#" class="block bg-mod-cap text-mod-legend hover:bg-mod-cap-hover hover:text-mod-legend-hover p-2 mb-4 rounded">Inventory</a>
      <a href="#" class="block bg-mod-cap text-mod-legend hover:bg-mod-cap-hover hover:text-mod-legend-hover p-2 mb-4 rounded">Profile</a>
    </div>
    <div class="md:col-span-3 lg:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-alpha-cap hover:bg-alpha-cap-hover rounded p-4">
        <h2 class="text-alpha-legend">Items in Hoard:</h2>
        <h3 class="text-alpha-legend-press">{{ items.length }}</h3>
      </div>
      <div class="bg-alpha-cap hover:bg-alpha-cap-hover rounded p-4">
        <h2 class="text-alpha-legend">Waiting on Orders:</h2>
        <template v-for="order in orders">
          <h3 class="text-alpha-legend-press" :key="order.id">{{ order.id }}</h3>
        </template>
      </div>
      <div class="bg-alpha-cap hover:bg-alpha-cap-hover rounded p-4">
        <h2 class="text-alpha-legend">Total Collection Purchase Price:</h2>
        <h3 class="text-alpha-legend-press">{{ totalPrice }}</h3>
      </div>
    </div>
  </div>
</template>
