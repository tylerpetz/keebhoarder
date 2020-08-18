<script>
import AuthForm from '@/components/AuthForm.vue'
import SwapCaps from '@/components/SwapCaps.vue'
import CreateCapSet from '@/components/CreateCapSet.vue'
// import ItemModal from '@/components/ItemModal.vue'

export default {
  name: 'Utilities',
  components: {
    AuthForm,
    SwapCaps,
    CreateCapSet
    // ItemModal
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
  <div>
    <AuthForm
      v-if="activeModal === 'register' || activeModal === 'login'"
      :auth-type="activeModal || ''"
      @close="activeModal = false"
    />
    <SwapCaps
      v-if="activeModal === 'theme'"
      @close="activeModal = false"
    />
    <CreateCapSet
      v-if="activeModal === 'create'"
      @close="activeModal = false"
    />
    <!-- <ItemModal /> -->
  </div>
</template>
