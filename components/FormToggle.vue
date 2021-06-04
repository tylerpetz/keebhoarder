<script>
export default {
  name: 'FormToggle',
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
    },
  },
}
</script>

<template>
  <div class="flex items-center space-x-4">
    <Keycap
      cap-style="large"
      type="button"
      role="switch"
      :aria-checked="value"
      :theme="value ? 'mod' : 'alphas'"
      v-bind="$attrs"
      @click.native="$emit('input', !value)"
    >
      <is-public :is-public="value" />
    </Keycap>
    <span><slot /></span>
  </div>
</template>
