<script>
export default {
  name: 'Layout',
  data () {
    return {
      activeTheme: 'metropolis'
    }
  },
  computed: {
    containerClass () {
      // purgeable css classes
      const activeTheme = ''
      if (activeTheme === '8008') return 'theme-8008'
      if (activeTheme === '9009') return 'theme-9009'
      if (activeTheme === 'dolch') return 'theme-dolch'
      if (activeTheme === 'milkshake') return 'theme-milkshake'
      if (activeTheme === 'oblivion') return 'theme-oblivion'
      if (activeTheme === 'laser') return 'theme-laser'
      if (activeTheme === 'bento') return 'theme-bento'
      if (activeTheme === 'metropolis') return 'theme-metropolis'
      if (activeTheme === 'wavez') return 'theme-wavez'

      return 'theme-metropolis'
    }
  }
}
</script>

<template>
  <main
    :class="containerClass"
    class="keebhoarder-theme bg-theme-bg font-body tracking-wider min-w-screen min-h-screen h-screen w-screen bg-caps flex flex-col items-center justify-between relative"
  >
    <section class="relative z-10 w-full px-2 my-2 rounded-lg flex-grow flex justify-center items-center">
      <slot />
    </section>
  </main>
</template>
