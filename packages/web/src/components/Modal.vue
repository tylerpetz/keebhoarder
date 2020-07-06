<script>
export default {
  name: 'Modal'
}
</script>

<template>
  <div class="rounded relative bg-theme-bg-alt w-11/12 max-h-full flex flex-col z-30">
    <header class="p-2">
      <Keycap theme="accent" @click.native="$emit('close')">Esc</Keycap>
      <slot name="header" />
    </header>
    <div class="bg-theme-bg relative flex-grow overflow-y-auto">
      <slot />
    </div>
    <slot name="footer" />
    <slot name="msg" />
  </div>
</template>
