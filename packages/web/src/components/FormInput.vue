<script>
export default {
  name: 'FormInput',
  props: {
    inputClasses: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  inheritAttrs: false
}
</script>

<template>
  <label class="relative flex flex-col">
    <span class="text-alpha-legend text-xs"><slot /></span>
    <input
      v-bind="$attrs"
      class="bg-alpha-cap hover:bg-alpha-cap-hover text-alpha-legend-press placeholder-alpha-legend-hover p-2 rounded text-sm"
      :class="inputClasses"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>
