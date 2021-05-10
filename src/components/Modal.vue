<script>
export default {
  name: 'Modal',
  props: {
    modalClass: {
      type: String,
      default: 'w-72 sm:w-80 md:w-96'
    }
  },
  created () {
    document.onkeydown = (e) => {
      e = e || window.event
      if (e.keyCode === 27) {
        this.$emit('close')
      }
    }
  },
  destroyed () {
    document.onkeydown = null
  }
}
</script>

<template>
  <transition
    name="modal"
  >
    <div
      class="absolute z-50 flex h-full w-full inset-0 items-center justify-center py-10"
    >
      <div
        class="rounded relative bg-theme-bg-d flex flex-col z-30 shadow-md overflow-hidden"
        :class="modalClass"
      >
        <header class="p-2">
          <Keycap
            theme="accent"
            @click.native="$closeModal"
          >
            Esc
          </Keycap>
          <slot name="header" />
        </header>
        <div
          class="bg-theme-bg-l relative flex-grow overflow-y-auto"
          @click.stop
        >
          <slot />
        </div>
        <slot name="msg" />
      </div>
      <div
        class="absolute h-full w-full inset-0 bg-theme-bg-d z-20 opacity-50"
        @click="$emit('close')"
      />
    </div>
  </transition>
</template>

<style lang="css" scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.15s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
