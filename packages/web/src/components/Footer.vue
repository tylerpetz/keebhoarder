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
  <footer class="absolute w-full bottom-0 right-0 left-0 p-4 pb-6 flex justify-between items-end z-10">
    <Shortcut :hotkeys="swapCaps" @click.native="$store.commit('SET_ACTIVE_MODAL', 'theme')">Swap Keycaps</Shortcut>
    <Shortcut :hotkeys="swapCaps" @click.native="$store.commit('SET_ACTIVE_MODAL', 'create')">Create Keycap Set</Shortcut>
    <div class="flex items-end">
      <a class="text-theme-link">Github</a>
    </div>
  </footer>
</template>
