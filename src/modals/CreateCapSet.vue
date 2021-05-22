<script>
import convert from 'color-convert'

export default {
  name: 'CreateCapSet',
  data () {
    return {
      themeName: '',
      colors: {
        alphaCaps: '',
        alphaLegends: '',
        modCaps: '',
        modLegends: '',
        accentCaps: '',
        accentLegends: '',
        themeBackground: '',
        themeText: '',
        themeLink: ''
        // themeBorder: ''
      }
    }
  },
  computed: {
    hsl () {
      const colors = Object.keys(this.colors)
      const convertedColors = {}
      colors.forEach((color) => {
        convertedColors[color] = convert.hex.hsl(this.colors[color].replace('#', ''))
      })
      return convertedColors
    },
    generatedTheme () {
      return `
.theme-${this.themeName.toLowerCase().split(' ').join('-') || 'demo'} {
/* alpha caps */
--alpha-cap-h: ${this.hsl.alphaCaps[0]};
--alpha-cap-s: ${this.hsl.alphaCaps[1]}%;
--alpha-cap-l: ${this.hsl.alphaCaps[2]}%;

/* alpha legends */
--alpha-legend-h: ${this.hsl.alphaLegends[0]};
--alpha-legend-s: ${this.hsl.alphaLegends[1]}%;
--alpha-legend-l: ${this.hsl.alphaLegends[2]}%;

/* mod caps */
--mod-cap-h: ${this.hsl.modCaps[0]};
--mod-cap-s: ${this.hsl.modCaps[1]}%;
--mod-cap-l: ${this.hsl.modCaps[2]}%;

/* mod legends */
--mod-legend-h: ${this.hsl.modLegends[0]};
--mod-legend-s: ${this.hsl.modLegends[1]}%;
--mod-legend-l: ${this.hsl.modLegends[2]}%;

/* accent caps */
--accent-cap-h: ${this.hsl.accentCaps[0]};
--accent-cap-s: ${this.hsl.accentCaps[1]}%;
--accent-cap-l: ${this.hsl.accentCaps[2]}%;

/* accent legends */
--accent-legend-h: ${this.hsl.accentLegends[0]};
--accent-legend-s: ${this.hsl.accentLegends[1]}%;
--accent-legend-l: ${this.hsl.accentLegends[2]}%;

--alpha-cap: hsl(var(--alpha-cap-h), var(--alpha-cap-s), var(--alpha-cap-l));
--alpha-cap-side: hsl(var(--alpha-cap-h), var(--alpha-cap-s), calc(var(--alpha-cap-l) * .7));
--alpha-cap-hover: hsl(var(--alpha-cap-h), var(--alpha-cap-s), calc(var(--alpha-cap-l) / .9));
--alpha-cap-press: hsl(var(--alpha-cap-h), var(--alpha-cap-s), calc(var(--alpha-cap-l) * .9));

--alpha-legend: hsl(var(--alpha-legend-h), var(--alpha-legend-s), var(--alpha-legend-l));
--alpha-legend-hover: hsl(var(--alpha-legend-h), var(--alpha-legend-s), calc(var(--alpha-legend-l) / .85));
--alpha-legend-press: hsl(var(--alpha-legend-h), var(--alpha-legend-s), calc(var(--alpha-legend-l) * .85));

--mod-cap: hsl(var(--mod-cap-h), var(--mod-cap-s), var(--mod-cap-l));
--mod-cap-side: hsl(var(--mod-cap-h), var(--mod-cap-s), calc(var(--mod-cap-l) * .7));
--mod-cap-hover: hsl(var(--mod-cap-h), var(--mod-cap-s), calc(var(--mod-cap-l) / .9));
--mod-cap-press: hsl(var(--mod-cap-h), var(--mod-cap-s), calc(var(--mod-cap-l) * .9));

--mod-legend: hsl(var(--mod-legend-h), var(--mod-legend-s), var(--mod-legend-l));
--mod-legend-hover: hsl(var(--mod-legend-h), var(--mod-legend-s), calc(var(--mod-legend-l) / .85));
--mod-legend-press: hsl(var(--mod-legend-h), var(--mod-legend-s), calc(var(--mod-legend-l) * .85));

--accent-cap: hsl(var(--accent-cap-h), var(--accent-cap-s), var(--accent-cap-l));
--accent-cap-side: hsl(var(--accent-cap-h), var(--accent-cap-s), calc(var(--accent-cap-l) * .7));
--accent-cap-hover: hsl(var(--accent-cap-h), var(--accent-cap-s), calc(var(--accent-cap-l) / .9));
--accent-cap-press: hsl(var(--accent-cap-h), var(--accent-cap-s), calc(var(--accent-cap-l) * .9));

--accent-legend: hsl(var(--accent-legend-h), var(--accent-legend-s), var(--accent-legend-l));
--accent-legend-hover: hsl(var(--accent-legend-h), var(--accent-legend-s), calc(var(--accent-legend-l) / .85));
--accent-legend-press: hsl(var(--accent-legend-h), var(--accent-legend-s), calc(var(--accent-legend-l) * .85));

/* theme backgrounds */
--theme-bg-h: ${this.hsl.themeBackground[0]};
--theme-bg-s: ${this.hsl.themeBackground[1]}%;
--theme-bg-l: ${this.hsl.themeBackground[2]}%;

/* theme text */
--theme-text-h: ${this.hsl.themeText[0]};
--theme-text-s: ${this.hsl.themeText[1]}%;
--theme-text-l: ${this.hsl.themeText[2]}%;

/* theme links/borders */
--theme-link-h: ${this.hsl.themeLink[0]};
--theme-link-s: ${this.hsl.themeLink[1]}%;
--theme-link-l: ${this.hsl.themeLink[2]}%;

// if dark background, make alts lighter
// if light background, make alts darker
// if none provided, ???

/* modify hsl values like a boss */
--theme-bg: hsl(var(--theme-bg-h), var(--theme-bg-s), var(--theme-bg-l));
--theme-bg-l: hsl(var(--theme-bg-h), var(--theme-bg-s), calc(var(--theme-bg-l) * 1.25));
--theme-bg-d: hsl(var(--theme-bg-h), var(--theme-bg-s), calc(var(--theme-bg-l) * .75));

--theme-text: hsl(var(--theme-text-h), var(--theme-text-s), var(--theme-text-l));
--theme-text-l: hsl(var(--theme-text-h), var(--theme-text-s), calc(var(--theme-text-l) * 1.25));
--theme-text-d: hsl(var(--theme-text-h), var(--theme-text-s), calc(var(--theme-text-l) * .75));

--theme-link: hsl(var(--theme-link-h), var(--theme-link-s), var(--theme-link-l));
--theme-link-hover: hsl(var(--theme-link-h), var(--theme-link-s), calc(var(--theme-link-l) * 1.1));
--theme-link-press: hsl(var(--theme-link-h), var(--theme-link-s), calc(var(--theme-link-l) * .9));

--theme-border: var(--theme-link);
--theme-border-hover: var(--theme-link-hover);
--theme-border-press: var(--theme-link-press);
}`
    }
  }
}
</script>

<template>
  <Modal
    modal-class="w-10/12"
    @close="$emit('close')"
  >
    <div class="flex p-8 flex-col mx-auto">
      <input
        v-model="themeName"
        class="mb-6"
        type="text"
        placeholder="theme name"
      >

      <div class="flex flex-row justify-between mb-6">
        <input
          v-model="colors.themeBackground"
          type="text"
          placeholder="theme bg"
        >
        <input
          v-model="colors.themeText"
          type="text"
          placeholder="theme text"
        >
        <input
          v-model="colors.themeLink"
          type="text"
          placeholder="theme link"
        >
        <!-- <input type="text" v-model="colors.themeBorder" placeholder="theme border" /> -->
      </div>

      <div class="flex flex-row justify-between">
        <div class="flex flex-col">
          <input
            v-model="colors.alphaCaps"
            class="mb-6"
            type="text"
            placeholder="alpha caps"
          >
          <input
            v-model="colors.alphaLegends"
            type="text"
            placeholder="alpha legends"
          >
        </div>
        <div class="flex flex-col">
          <input
            v-model="colors.modCaps"
            class="mb-6"
            type="text"
            placeholder="mod caps"
          >
          <input
            v-model="colors.modLegends"
            type="text"
            placeholder="mod legends"
          >
        </div>
        <div class="flex flex-col">
          <input
            v-model="colors.accentCaps"
            class="mb-6"
            type="text"
            placeholder="accent caps"
          >
          <input
            v-model="colors.accentLegends"
            type="text"
            placeholder="accent legends"
          >
        </div>
      </div>

      <textarea
        v-model="generatedTheme"
        readonly
        class="mt-8"
        rows="20"
      />
    </div>
  </Modal>
</template>
