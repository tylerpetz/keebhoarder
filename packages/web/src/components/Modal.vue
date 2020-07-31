<script>
export default {
  name: 'Modal',
  props: {
    modalClass: {
      type: String,
      default: 'w-72 sm:w-80 md:w-96'
    }
  },
  created () {
    document.onkeydown = e => {
      e = e || window.event
      if (e.keyCode === 27) {
        this.$emit('close')
      }
    }
  },
  destroyed () {
    document.onkeydown = null
  }
}
</script>

<template>
  <div class="absolute h-full w-full inset-0 flex items-center justify-center py-20">
    <div class="rounded relative bg-theme-bg-d flex flex-col z-30 shadow-md" :class="modalClass">
      <header class="p-2">
        <keycap theme="accent" @click.native="$emit('close')">Esc</keycap>
        <slot name="header" />
      </header>
      <div class="bg-theme-bg-l relative flex-grow overflow-y-auto">
        <slot />
      </div>
      <slot name="footer" />
      <slot name="msg" />
    </div>
    <div class="absolute h-full w-full inset-0 bg-theme-bg-d z-20 opacity-50" />
  </div>
</template>
