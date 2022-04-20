<script>
import { themes } from '@/utils/themes'
import Keycap from '~/components/Keycap.vue'

export default {
  name: 'ThemeModal',
  components: { Keycap },
  data() {
    return {
      themes,
      setDefaultTheme: false,
    }
  },
  methods: {
    async updateDefaultTheme() {
      this.$closeModal()
      await this.$axios.$put('/me', {
        theme: this.$store.state.app.activeTheme.id,
      })
      this.$showMessage({
        title: 'Default theme updated',
        text: 'Nice job.',
        type: 'success',
      })
    },
  },
}
</script>

<template>
  <Modal
    modal-class="w-10/12 md:w-3/4 max-h-full"
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
          <span class="pb-2 text-theme-text text-lg font-bold">
            {{ theme.name }}
            {{ $auth.user?.profile?.theme === theme.id ? '(Default)' : '' }}
          </span>
          <div class="flex flex-row">
            <Keycap cap-style="large">Base</Keycap>
            <Keycap cap-style="large" theme="mod" type="mod" class="mx-2">
              Mods
            </Keycap>
            <Keycap cap-style="large" theme="accent">Accents</Keycap>
          </div>
        </div>
      </div>
    </div>
    <template slot="footer">
      <div class="p-2 flex justify-end" v-if="$auth.loggedIn">
        <Keycap
          theme="mod"
          @click.native="updateDefaultTheme"
        >
          Use {{ $store.state.app.activeTheme.id }}
        </Keycap>
      </div>
    </template>
  </Modal>
</template>
