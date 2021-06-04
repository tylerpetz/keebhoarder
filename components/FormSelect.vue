<script>
export default {
  name: 'FormSelect',
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
}
</script>

<template>
  <label class="relative flex flex-col">
    <span class="text-theme-text text-xs"><slot /></span>
    <select
      v-bind="$attrs"
      class="
        bg-alpha-cap
        hover:bg-alpha-cap-hover
        text-alpha-legend-press
        placeholder-alpha-legend-hover
        p-2
        rounded
        text-sm
      "
    >
      <option v-if="placeholder" selected disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.text"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </label>
</template>
