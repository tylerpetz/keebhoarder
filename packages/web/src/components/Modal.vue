<script>
export default {
  name: 'Modal',
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
  <div class="rounded relative bg-theme-bg-alt flex flex-col z-30">
    <header class="p-2">
      <keycap theme="accent" @click.native="$emit('close')">Esc</keycap>
      <slot name="header" />
    </header>
    <div class="bg-theme-bg relative flex-grow overflow-y-auto">
      <slot />
    </div>
    <slot name="footer" />
    <slot name="msg" />
  </div>
</template>
