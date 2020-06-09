<script>

export default {
  name: 'Inventory',
  components: {
    // Vuetable
  },
  data () {
    return {
      loading: false
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
      </div>
    </div>
  </div>
</template>
