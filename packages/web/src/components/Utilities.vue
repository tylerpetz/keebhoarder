<script>
import AuthForm from '@/components/AuthForm.vue'
import SwapCaps from '@/components/SwapCaps.vue'
import CreateCapSet from '@/components/CreateCapSet.vue'

export default {
  name: 'Utilities',
  components: {
    AuthForm,
    SwapCaps,
    CreateCapSet
  },
  computed: {
    activeModal: {
      get () {
        return this.$store.state.activeModal
      },
      set (modal = false) {
        this.$store.commit('SET_ACTIVE_MODAL', modal)
      }
    }
  }
}
</script>

<template>
  <div class="absolute h-full w-full inset-0 flex items-center justify-center py-20">
    <AuthForm v-if="activeModal === 'register' || activeModal === 'login'" :authType="activeModal || ''" @close="activeModal = false" />
    <SwapCaps v-if="activeModal === 'theme'" @close="activeModal = false" />
    <CreateCapSet v-if="activeModal === 'create'" @close="activeModal = false" />
    <div class="absolute h-full w-full inset-0 bg-theme-bg-alt" :class="activeModal ? 'z-20 opacity-50' : 'z-0'" />
  </div>
</template>
