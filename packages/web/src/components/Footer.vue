<script>
export default {
  name: 'Footer',
  data () {
    return {
      swapCaps: [
        {
          text: 'Alt',
          capStyle: 'large',
          theme: 'mod'
        },
        {
          text: 'K',
          textSize: 'large'
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
