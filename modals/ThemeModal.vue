<script>
import { themes } from '@/utils/themes'

export default {
  name: 'ThemeModal',
  data() {
    return {
      themes,
    }
  },
}
</script>

<template>
  <Modal
    modal-class="w-10/12 md:w-2/3 max-h-full overflow-y-scroll"
    data-test="theme-modal"
    @close="$closeModal"
  >
    <div class="flex flex-row flex-wrap items-stretch p-1">
      <div
        v-for="theme in themes"
        :key="theme.id"
        class="w-full md:w-1/2 xl:w-1/4 p-1"
        data-test="theme-modal-theme"
        @click="$store.dispatch('app/changeThemes', theme)"
      >
        <div
          :class="[
            `theme-${theme.id}`,
            $store.state.app.activeTheme.id === theme.id
              ? 'border-theme-border'
              : 'border-transparent cursor-pointer',
          ]"
          class="
            border-2
            bg-theme-bg
            p-4
            pb-6
            flex flex-col
            items-center
            rounded
          "
        >
          <span class="pb-2 text-theme-text text-lg font-bold">{{
            theme.name
          }}</span>
          <div class="flex flex-row">
            <Keycap cap-style="large"> Base </Keycap>
            <Keycap cap-style="large" theme="mod" type="mod" class="mx-2">
              Mods
            </Keycap>
            <Keycap cap-style="large" theme="accent"> Accents </Keycap>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$store.getters['auth/loggedIn']">yo yo hey</div>
  </Modal>
</template>
