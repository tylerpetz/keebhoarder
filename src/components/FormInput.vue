<script>
export default {
  name: 'FormInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <label class="relative flex flex-col">
    <span class="text-theme-text text-xs"><slot /></span>
    <input
      v-bind="$attrs"
      class="bg-alpha-cap hover:bg-alpha-cap-hover text-alpha-legend-press placeholder-alpha-legend-hover p-2 rounded text-sm"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </label>
</template>
