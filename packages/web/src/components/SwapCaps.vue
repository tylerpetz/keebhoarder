<script>
export default {
  name: 'SwapCaps',
  data () {
    return {
      themes: ['8008', '9009', 'bento', 'dolch', 'laser', 'milkshake', 'oblivion', 'wavez']
    }
  }
}
</script>

<template>
  <Modal>
    <div class="flex flex-row flex-wrap p-1">
      <div v-for="theme in themes" :key="theme" @click="$store.commit('SET_ACTIVE_THEME', theme)" class="w-1/3 p-1">
        <div
          :class="[`theme-${theme}`, $store.getters.activeTheme === theme ? 'border-theme-border' : 'border-transparent cursor-pointer']"
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
  </Modal>
</template>
