<script>
export default {
  name: 'SwapCaps',
  data () {
    return {
      themes: ['8008', '9009', 'bento', 'dolch', 'laser', 'metropolis', 'milkshake', 'oblivion', 'wavez'],
      firstKeys: ['B', 'C', 'Q', 'R', 'U'],
      secondKeys: ['Control', 'Alt', 'Super', 'Shift', 'Tab', 'Meta'],
      thirdKeys: ['Esc', '&#10229; Enter']
    }
  },
  computed: {
    first () {
      return this.firstKeys[Math.floor(Math.random() * this.firstKeys.length)]
    },
    second () {
      return this.secondKeys[Math.floor(Math.random() * this.secondKeys.length)]
    },
    third () {
      return this.thirdKeys[Math.floor(Math.random() * this.thirdKeys.length)]
    }
  }
}
</script>

<template>
  <Modal @close="$emit('close')" class="swap-caps max-h-full">
    <div class="flex flex-row flex-wrap items-stretch p-1">
      <div v-for="theme in themes" :key="theme" @click="$store.commit('SET_ACTIVE_THEME', theme)" class="w-full sm:w-1/2 md:w-1/3 p-1">
        <div
          :class="[`theme-${theme}`, $store.getters.activeTheme === theme ? 'border-theme-border' : 'border-transparent cursor-pointer']"
          class="border-2 bg-theme-bg p-4 pb-6 flex flex-col items-center rounded"
        >
          <span class="pb-2 text-theme-text text-lg font-bold">{{ theme }}</span>
          <div class="flex flex-row">
            <keycap textSize="large"><span v-html="first" /></keycap>
            <keycap capStyle="large" theme="mod" type="mod" class="mx-2"><span v-html="second" /></keycap>
            <keycap capStyle="large" theme="accent"><span v-html="third" /></keycap>
          </div>
        </div>
      </div>
    </div>
    <footer class="p-2 flex" :class="authType === 'login' ? 'justify-between' : 'justify-end'" slot="footer">
      <keycap theme="mod" capStyle="large" @click.native="$emit('close')" class="capitalize">Create Cap Set</keycap>
    </footer>
  </Modal>
</template>

<style scoped>
.swap-caps {
  width: 95%;
  max-width: 900px;
}
</style>
