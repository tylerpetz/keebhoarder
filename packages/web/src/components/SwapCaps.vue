<script>
export default {
  name: 'SwapCaps',
  data () {
    return {
      themes: ['8008', '9009', 'bento', 'dolch', 'laser', 'metropolis', 'milkshake', 'oblivion', 'wavez'],
      firstKeys: ['B', 'C', 'Q', 'R', 'U'],
      secondKeys: ['Control', 'Alt', 'Super', 'Shift', 'Tab', 'Return'],
      thirdKeys: ['Esc', '&#10229; Enter']
    }
  }
}
</script>

<template>
  <Modal @close="$emit('close')">
    <div class="flex flex-row flex-wrap items-stretch p-1">
      <div v-for="theme in themes" :key="theme" @click="$store.commit('SET_ACTIVE_THEME', theme)" class="w-full p-1">
        <div
          :class="[`theme-${theme}`, $store.getters.activeTheme === theme ? 'border-theme-border' : 'border-transparent cursor-pointer']"
          class="border-2 bg-theme-bg p-4 pb-6 flex flex-col items-center rounded"
        >
          <span class="pb-2 text-theme-text text-lg font-bold">{{ theme }}</span>
          <div class="flex flex-row">
            <Keycap textSize="large"><span v-html="firstKeys[Math.floor(Math.random() * firstKeys.length)]" /></Keycap>
            <Keycap capStyle="large" theme="mod" type="mod" class="mx-2"><span v-html="secondKeys[Math.floor(Math.random() * secondKeys.length)]" /></Keycap>
            <Keycap capStyle="large" theme="accent"><span v-html="thirdKeys[Math.floor(Math.random() * thirdKeys.length)]" /></Keycap>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
