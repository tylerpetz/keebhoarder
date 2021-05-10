<script>
export default {
  name: 'FormToggle',
  inheritAttrs: false,
  props: {
    inputClasses: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean
    }
  }
}
</script>

<template>
  <div class="flex items-center space-x-4">
    <button
      type="button"
      class="relative flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2  focus:ring-theme-link"
      role="switch"
      :aria-checked="value"
      :class="value ? 'bg-theme-link' : 'bg-gray-400'"
      @click="$emit('input', !value)"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        class="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        :class="value ? 'translate-x-5' : 'translate-x-0'"
      />
    </button>
    <span><slot /></span>
  </div>
</template>
