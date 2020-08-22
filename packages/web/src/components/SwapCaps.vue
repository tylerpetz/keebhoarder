<script>
export default {
  name: 'SwapCaps',
  data () {
    return {
      themes: [
        '8008',
        '9009',
        'bento',
        'dolch',
        'laser',
        'metropolis',
        'milkshake',
        'oblivion',
        'wavez'
      ]
    }
  }
}
</script>

<template>
  <Modal
    modal-class="w-10/12 md:w-2/3 max-h-full overflow-y-scroll"
    @close="$emit('close')"
  >
    <div class="flex flex-row flex-wrap items-stretch p-1">
      <div
        v-for="theme in themes"
        :key="theme"
        class="w-full md:w-1/2 lg:w-1/3 p-1"
        @click="$store.commit('SET_ACTIVE_THEME', theme)"
      >
        <div
          :class="[
            `theme-${theme}`,
            $store.getters.activeTheme === theme
              ? 'border-theme-border'
              : 'border-transparent cursor-pointer'
          ]"
          class="border-2 bg-theme-bg p-4 pb-6 flex flex-col items-center rounded"
        >
          <span class="pb-2 text-theme-text text-lg font-bold">{{
            theme
          }}</span>
          <div class="flex flex-row">
            <Keycap cap-style="large">
              Base
            </Keycap>
            <Keycap
              cap-style="large"
              theme="mod"
              type="mod"
              class="mx-2"
            >
              Mods
            </Keycap>
            <Keycap
              cap-style="large"
              theme="accent"
            >
              Accents
            </Keycap>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
