<script>
export default {
  name: 'Keycap',
  props: {
    theme: {
      type: String,
      default: 'alpha',
      description: 'alpha, mod, accent',
    },
    textSize: {
      type: String,
      default: 'small',
      description: 'small, large',
    },
    capStyle: {
      type: String,
      default: 'small',
      description: 'small, large',
    },
  },
  computed: {
    // purgable css classes
    faceClasses() {
      if (this.theme === 'mod') {
        return [
          'text-mod-legend',
          'bg-mod-cap',
          'hover:text-mod-legend-hover',
          'hover:bg-mod-cap-hover',
          'active:bg-text-mod-legend-press',
          'active:bg-mod-cap-press',
        ]
      }
      if (this.theme === 'accent') {
        return [
          'text-accent-legend',
          'bg-accent-cap',
          'hover:text-accent-legend-hover',
          'hover:bg-accent-cap-hover',
          'active:bg-text-accent-legend-press',
          'active:bg-accent-cap-press',
        ]
      }
      return [
        'text-alpha-legend',
        'bg-alpha-cap',
        'hover:text-alpha-legend-hover',
        'hover:bg-alpha-cap-hover',
        'active:bg-text-alpha-legend-press',
        'active:bg-alpha-cap-press',
      ]
    },
    sideClasses() {
      if (this.theme === 'mod') return ['bg-mod-cap-side']
      if (this.theme === 'accent') return ['bg-accent-cap-side']
      return ['bg-alpha-cap-side']
    },
  },
}
</script>

<template>
  <button
    class="keycap relative rounded-sm w-auto inline-flex flex-col justify-start"
    :class="[sideClasses, capStyle !== 'tiny' ? 'h-12' : 'tiny']"
    type="button"
  >
    <span
      :class="[
        faceClasses,
        textSize === 'large'
          ? 'text-base font-extrabold pb-3'
          : 'text-xs font-bold pb-1',
        capStyle === 'large' ? 'w-auto pr-3' : '',
        capStyle === 'tiny' ? 'tiny' : '',
      ]"
      class="
        keycap-face
        px-1
        z-10
        flex
        rounded
        leading-relaxed
        items-center
        justify-start
        relative
      "
    >
      <slot />
    </span>
  </button>
</template>

<style lang="css" scoped>
.keycap {
  box-shadow: inset 10px -3px 5px -7px rgba(0, 0, 0, 0.15),
    inset -10px -3px 5px -7px rgba(0, 0, 0, 0.25);
  padding: 0 6px;
}

.keycap.tiny {
  height: 34px;
  padding: 0 4px;
}

.keycap-face {
  transform: translateY(0);
  min-width: 32px;
  height: 38px;
  box-shadow: inset 8px 0 12px -4px rgba(255, 255, 255, 0.05),
    inset -8px 0 12px -4px rgba(255, 255, 255, 0.05);
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);
}

.keycap-face.tiny {
  min-width: 24px;
  height: 26px;
}

.keycap:active .keycap-face {
  transform: translateY(1px);
}

.keycap:focus {
  @apply ring-2 ring-theme-link-press;
}
</style>
