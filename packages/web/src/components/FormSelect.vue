<script>
export default {
  name: 'FormSelect',
  inheritAttrs: false,
  props: {
    inputClasses: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => [
        {
          text: 'option 1',
          value: 1
        }
      ]
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <label class="relative flex flex-col">
    <span class="text-alpha-legend text-xs"><slot /></span>
    <select
      v-bind="$attrs"
      class="bg-alpha-cap hover:bg-alpha-cap-hover text-alpha-legend-press placeholder-alpha-legend-hover p-2 rounded text-sm"
      :class="inputClasses"
    >
      <option
        v-if="placeholder"
        selected
        disabled
      >{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.text"
        :value="option.value"
      >{{
        option.text
      }}</option>
    </select>
  </label>
</template>
