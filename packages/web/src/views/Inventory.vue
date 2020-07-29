<script>
import gql from 'graphql-tag'

export default {
  name: 'Inventory',
  apollo: {
    // orders: gql`query {
    //   orders {
    //     id,
    //     notes {
    //       description
    //     },
    //     trackingNumber,
    //     items {
    //       id,
    //       description,
    //       price,
    //       categories {
    //         name,
    //       },
    //       images {
    //         url,
    //       }
    //     }
    //   }
    // }`,
    items: gql`query {
      items {
        id,
        description,
        price,
        categories {
          name,
        },
        images {
          url,
        }
      }
    }`
  },
  data () {
    return {
      loading: false,
      itemTypes: ['Keyboards', 'Keycap Sets', 'Artisans', 'Switches', 'Cases', 'Plates', 'PCBs/Controllers', 'Other'],
      items: []
    }
  },
  computed: {
    localData () {
      return [
        {
          name: 'sup'
        }
      ]
    }
  }
}
</script>

<template>
  <div class="bg-theme-bg-alt h-full p-8 pr-6">
    <div class="w-full flex justify-between mb-6">
      <div>
        <h1 class="text-theme-text text-xl">Inventory</h1>
      </div>
      <div>
        <Shortcut :hotkeys="[{text: 'Alt', theme: 'mod', type: 'mod' }, {text: 'N', theme: 'base' }]" @click.native="$store.commit('SET_ACTIVE_MODAL', '')">Add New Item</Shortcut>
        <div v-for="(order, index) in orders" v-bind:key="index" class="text-white">
          {{order.id}} - {{order.trackingNumber}}
        </div>
      </div>
    </div>
  </div>
</template>
