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
  <footer class="w-full p-4 flex justify-end z-10">
    <p class="text-theme-text text-xs">copyright &copy; 2020 keebhoarder - github - donate</p>
  </footer>
</template>
