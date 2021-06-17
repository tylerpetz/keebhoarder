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
    value: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <label class="relative flex flex-col">
    <span class="text-theme-text text-xs"><slot /></span>
    <select
      v-bind="$attrs"
      :value="value"
      class="
        bg-alpha-cap
        hover:bg-alpha-cap-hover
        text-alpha-legend-press
        placeholder-alpha-legend-hover
        p-2
        rounded
        text-sm
      "
      v-on="{
        ...$listeners,
        input: (event) => $emit('input', event.target.value),
      }"
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
