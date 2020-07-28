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
  <footer class="w-full p-2 flex justify-between z-10">
    <p class="text-theme-text text-xs">&copy; 2020 keebhoarder</p>
    <p class="text-theme-text text-xs pr-1">about - help - donate</p>
  </footer>
</template>
