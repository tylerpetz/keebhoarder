<script>
export default {
  name: 'Modal',
  props: {
    clickBgToClose: {
      type: Boolean,
      default: true,
    },
    modalClass: {
      type: String,
      default: 'w-72 sm:w-80 md:w-96',
    },
  },
  mounted() {
    document.onkeydown = (e) => {
      e = e || window.event
      if (e.keyCode === 27) {
        this.$emit('close')
      }
    }
  },
  destroyed() {
    document.onkeydown = null
  },
  methods: {
    bgClicked() {
      if (this.clickBgToClose) {
        this.$emit('close')
      }
    },
  },
}
</script>

<template>
  <transition name="modal">
    <div
      class="
        absolute
        z-40
        flex
        h-full
        w-full
        inset-0
        items-center
        justify-center
        py-10
      "
    >
      <div
        class="
          rounded
          relative
          bg-theme-bg-d
          flex flex-col
          z-30
          shadow-md
          overflow-hidden
        "
        :class="modalClass"
      >
        <header class="p-2">
          <Keycap theme="accent" @click.native="$emit('close')">Esc</Keycap>
          <slot name="header" />
        </header>
        <div
          class="bg-theme-bg-l relative flex-grow overflow-y-auto"
          @click.stop
        >
          <slot />
        </div>
        <slot name="msg" />
        <slot name="footer" />
      </div>
      <div
        class="absolute h-full w-full inset-0 bg-theme-bg-d z-20 opacity-70"
        data-test="modal-bg"
        @click="bgClicked"
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

@media (prefers-reduced-motion) {
  .modal-enter-active,
  .modal-leave-active {
    transition: none;
  }
}
</style>
