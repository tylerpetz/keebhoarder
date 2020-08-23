<script>
import gql from 'graphql-tag'

export default {
  name: 'Inventory',
  props: {
    category: {
      type: String,
      required: false,
      default: null
    }
  },
  apollo: {
    orders: gql`
      query {
        orders {
          id
          notes {
            description
          }
          trackingNumber
          items {
            id
            description
            price
            categories {
              name
            }
            images {
              url
            }
          }
        }
      }
    `,
    items: gql`
      query {
        items {
          id
          description
          price
          categories {
            name
          }
          images {
            url
          }
        }
      }
    `
  },
  data () {
    return {
      loading: false,
      itemTypes: [
        'Keyboards',
        'Keycap Sets',
        'Artisans',
        'Switches',
        'Cases',
        'Plates',
        'PCBs/Controllers',
        'Other'
      ],
      items: []
    }
  }
}
</script>

<template>
  <section class="p-4 w-full h-full flex flex-col flex-no-wrap justify-between mb-6">
    <h1 class="text-theme-text text-2xl mb-4">
      Inventory
    </h1>
    <div class="flex-grow">
      <div
        v-if="!category"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
      >
        <router-link
          v-for="item in itemTypes"
          :key="item"
          :to="{ name: 'Inventory', params: { category: item } }"
          class="bg-theme-bg-d text-theme-text-l hover:bg-theme-bg-l hover:text-theme-text-d rounded p-4 transition-colors duration-75"
        >
          {{ item }}
        </router-link>
      </div>
      <div v-else>
        <h2>{{ category }}</h2>
      </div>
    </div>
  </section>
</template>
