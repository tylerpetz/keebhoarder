<script>
export default {
  name: 'SwapCaps',
  props: {
    selectedTheme: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      themes: ['8008', '9009', 'bento', 'dolch', 'laser', 'milkshake', 'oblivion', 'wavez']
    }
  }
}
</script>

<template>
  <div class="w-1/2 min-w-64 relative">
    <div class="h-auto bg-theme-bg-alt flex flex-row flex-wrap justify-center p-6 rounded -mx-3">
      <div v-for="theme in themes" :key="theme" @click="$emit('change', theme)" class="w-1/2 p-3">
        <div
          :class="[`theme-${theme}`, selectedTheme === theme ? 'border-theme-border' : 'border-transparent cursor-pointer']"
          class="border-2 bg-theme-bg p-4 pb-6 flex flex-col items-center rounded"
        >
          <span class="pb-2 text-theme-text text-lg font-bold">{{ theme }}</span>
          <div class="flex flex-row">
            <Keycap>G</Keycap>
            <Keycap theme="mod" type="mod">Ctrl</Keycap>
            <Keycap theme="accent">Esc</Keycap>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-6">
      <button class="text-theme-text hover:text-theme-text-alt cursor-pointer text-xs flex items-center" @click="$emit('close')">
        Close <Keycap theme="mod">Esc</Keycap>
      </button>
    </div>
  </div>
</template>
