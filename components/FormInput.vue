<script>
export default {
  name: 'FormInput',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
  },
}
</script>

<template>
  <label class="flex flex-col">
    <span class="text-theme-text text-xs"><slot /></span>
    <div class="relative">
      <input
        v-bind="$attrs"
        class="
          bg-alpha-cap
          hover:bg-alpha-cap-hover
          text-theme-text
          placeholder-theme-text-placeholder
          p-2
          rounded
          text-sm
          w-full
        "
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
      <div
        v-if="$slots.icon"
        class="
          absolute
          right-0
          bottom-0
          h-full
          pr-2
          flex
          items-center
          text-alpha-legend
          hover:text-red-600
        "
      >
        <slot name="icon" />
      </div>
    </div>
  </label>
</template>
