<script>
export default {
  name: 'Modal'
}
</script>

<template>
  <div class="w-1/2 rounded min-w-64 relative bg-theme-bg-alt">
    <header class="p-2">
      <Keycap theme="accent" @click.native="$emit('close')" class="ml-0">Esc</Keycap>
      <slot name="header" />
    </header>
    <div class="bg-theme-bg relative">
      <slot />
    </div>
    <slot name="footer" />
  </div>
</template>
