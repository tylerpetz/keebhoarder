<script>
export default {
  name: 'Keycap',
  props: {
    size: {
      type: String,
      default: 'small'
    },
    theme: {
      type: String,
      default: 'alpha'
    }
  },
  computed: {
    // purgable css classes
    faceClasses () {
      if (this.theme === 'mod') return ['text-mod-legend', 'bg-mod-cap', 'hover:text-mod-legend-hover', 'hover:bg-mod-cap-hover']
      if (this.theme === 'accent') return ['text-accent-legend', 'bg-accent-cap', 'hover:text-accent-legend-hover', 'hover:bg-accent-cap-hover']
      return ['text-alpha-legend', 'bg-alpha-cap', 'hover:text-alpha-legend-hover', 'hover:bg-alpha-cap-hover', 'active:bg-text-alpha-legend-press', 'active:bg-alpha-cap-press']
    },
    sideClasses () {
      if (this.theme === 'mod') return ['bg-mod-cap-side']
      if (this.theme === 'accent') return ['bg-accent-cap-side']
      return ['bg-alpha-cap-side']
    }
  }
}
</script>

<template>
  <button class="keycap relative mx-2" :class="`keycap--${size}`">
    <span
      :class="[faceClasses, size === 'small' ? 'text-sm' : 'text-2xl']"
      class="keycap-face relative z-10 block rounded px-3 leading-relaxed font-bold"
    >
      <slot />
    </span>
    <span
      :class="sideClasses"
      class="keycap-side absolute rounded" />
  </button>
</template>

<style lang="css" scoped>
.keycap, .keycap * {
  transition: transform 100ms ease, filter 150ms ease;
}

.keycap:active .keycap-face {
  top: 2px;
}

.keycap-side {
  top: 0px;
  left: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 4px);
  transform: perspective(8px) rotateX(1deg) translateY(2px);
}

.keycap--large .keycap-side {
  top: 0px;
  left: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  transform: perspective(10px) rotateX(1deg) translateY(2px);
}
</style>
