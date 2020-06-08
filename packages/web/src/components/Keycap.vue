<script>
export default {
  name: 'Keycap',
  props: {
    theme: {
      type: String,
      default: 'alpha',
      description: 'alpha, mod, accent'
    },
    type: {
      type: String,
      default: 'single',
      description: 'single, mod, auto, logo'
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
    },
    capSize () {
      if (this.type === 'large') return ['w-10', 'h-10']
      if (this.type === 'mod') return ['w-10', 'h-7']
      if (this.type === 'auto') return ['w-auto', 'h-7', 'pr-4']
      return ['w-7', 'h-7']
    }
  }
}
</script>

<template>
  <button class="keycap relative mx-2">
    <span
      :class="[faceClasses, capSize, type === 'large' ? 'text-lg' : 'text-xs']"
      class="keycap-face relative z-10 flex rounded px-1 leading-relaxed font-bold items-center justify-start"
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

.keycap-face:before {
  box-shadow: inset 3px 0px 6px rgba(0,0,0,.25), inset -3px 0px 6px rgba(0,0,0,.25), inset 0px -1px 1px rgba(255,255,255,.15);
}

.keycap-side {
  top: 0px;
  left: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 4px);
  transform: perspective(8px) rotateX(1deg) translateY(2px);
}
</style>
