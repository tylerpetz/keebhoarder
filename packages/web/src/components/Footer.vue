<script>
export default {
  name: 'Footer',
  data () {
    return {
      swapCaps: [
        {
          text: 'Alt',
          type: 'mod',
          theme: 'mod'
        },
        {
          text: 'K'
        }
      ]
    }
  }
}
</script>

<template>
  <footer class="w-full p-4 pb-6 flex justify-between items-end z-10">
    <Shortcut :hotkeys="swapCaps" @click.native="$store.commit('SET_ACTIVE_MODAL', 'theme')">Swap Keycaps</Shortcut>
  </footer>
</template>
