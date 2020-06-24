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
    <span class="text-xs mr-1"><slot /></span>
    <div v-for="(hotkey, index) in hotkeys" :key="`${hotkey.text}-${_uid}`">
      <Keycap :type="hotkey.type || undefined" :theme="hotkey.theme || undefined"><span v-html="hotkey.text" /></Keycap>
      <span v-if="showCombo(index)" class="text-xs">+</span>
    </div>
  </button>
</template>
