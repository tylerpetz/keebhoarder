<script>
export default {
  name: 'Shortcut',
  props: {
    hotkeys: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    showCombo (index) {
      return this.hotkeys.length > 1 && (index < this.hotkeys.length - 1)
    }
  }
}
</script>

<template>
  <button class="text-theme-text hover:text-theme-text-alt cursor-pointer flex items-center">
    <span class="text-xs"><slot /></span>
    <template v-for="(hotkey, index) in hotkeys">
      <Keycap :key="hotkey.text" :type="hotkey.type || undefined" :theme="hotkey.theme || undefined"><span v-html="hotkey.text" /></Keycap>
      <span :key="hotkey.text" v-if="showCombo(index)" class="text-xs">+</span>
    </template>
  </button>
</template>
