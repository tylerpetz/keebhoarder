<script>
export default {
  name: 'Modal'
}
</script>

<template>
  <div class="rounded relative bg-theme-bg-alt w-1/3">
    <header class="p-2">
      <Keycap theme="accent" @click.native="$emit('close')" class="ml-0">Esc</Keycap>
      <slot name="header" />
    </header>
    <div class="bg-theme-bg relative">
      <slot />
    </div>
    <slot name="footer" />
    <slot name="msg" />
  </div>
</template>
