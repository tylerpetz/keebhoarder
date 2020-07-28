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
  <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-2 h-full">
    <div class="md:col-span-3 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-6 gap-2">
      <div class="flex items-center justify-center flex-col">
        <h2 class="text-alpha-legend">Total Items in Collection</h2>
        <h3 class="text-alpha-legend-press">{{ items.length }}</h3>
      </div>
      <div class="flex items-center justify-center flex-col">
        <h2 class="text-alpha-legend">Waiting on Orders:</h2>
        <template v-for="order in orders">
          <h3 class="text-alpha-legend-press" :key="order.id">{{ order.id }}</h3>
        </template>
      </div>
      <div class="flex items-center justify-center flex-col">
        <h2 class="text-alpha-legend">Total Collection Purchase Price:</h2>
        <h3 class="text-alpha-legend-press">{{ totalPrice }}</h3>
      </div>
      <div class="col-span-3 row-span-5 bg-alpha-cap rounded p-4">
        latest items
      </div>
    </div>
  </div>
</template>
