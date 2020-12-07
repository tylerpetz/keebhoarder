<script>
import gql from 'graphql-tag'

const categories = [
  {
    text: 'Keyboards',
    url: 'keyboards'
  },
  {
    text: 'Keycap Sets',
    url: 'keycap-sets'
  },
  {
    text: 'Artisans',
    url: 'artisans'
  },
  {
    text: 'Switches',
    url: 'switches'
  },
  {
    text: 'Cases',
    url: 'cases'
  },
  {
    text: 'Plates',
    url: 'plates'
  },
  {
    text: 'PCBs/Controllers',
    url: 'pcbs-controllers'
  },
  {
    text: 'Other',
    url: 'other'
  }
]

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
      categories,
      loading: false,
      items: []
    }
  },
  computed: {
    selectedCategory () {
      if (!this.category) return false
      const selectedCategory = this.categories.find(category => category.url === this.category)
      return selectedCategory || false
    }
  }
}
</script>

<template>
  <section class="p-4 w-full h-full flex flex-col flex-nowrap justify-between mb-6">
    <h1 class="text-theme-text text-2xl mb-4">
      {{ selectedCategory ? selectedCategory.text : 'Inventory' }}
    </h1>
    <div
      v-if="!category"
      class="flex-grow flex flex-row flex-wrap justify-center items-stretch -mx-4"
    >
      <div
        v-for="cat in categories"
        :key="cat.url"
        class="h-1/2 w-1/4 p-4"
      >
        <div class="h-full w-full bg-theme-bg-d text-theme-text-l hover:bg-theme-bg-l hover:text-theme-text-d rounded-lg p-4 transition-colors duration-75">
          <router-link
            :to="{ name: 'Inventory', params: { category: cat.url } }"
            class="w-full h-full block"
          >
            {{ cat.text }}
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>{{ selectedCategory.text }}</h2>
    </div>
  </section>
</template>
