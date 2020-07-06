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
  <div class="absolute h-full w-full inset-0 flex items-center justify-center" :class="activeModal ? 'z-20 bg-black bg-opacity-50' : 'z-0'">
    <AuthForm v-show="activeModal === 'register' || activeModal === 'login'" :authType="activeModal || ''" @close="activeModal = false" />
    <SwapCaps v-show="activeModal === 'theme'" @close="activeModal = false" />
    <CreateCapSet v-show="activeModal === 'create'" @close="activeModal = false" />
  </div>
</template>
