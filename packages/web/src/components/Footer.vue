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
  <footer class="w-full p-2 flex justify-between items-center z-10">
    <Keycap theme="mod" capStyle="large" @click.native="$store.commit('SET_ACTIVE_MODAL', 'theme')">Swap Keycaps</Keycap>
    <p class="text-theme-text mr-4 text-xs">copyright &copy; 2020 keebhoarder - github - donate</p>
  </footer>
</template>
