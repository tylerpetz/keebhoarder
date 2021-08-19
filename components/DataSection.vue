<script>
export default {
  name: 'DataSection',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <section>
    <h3 class="text-sm font-medium text-theme-text-d mb-4">{{ title }}</h3>
    <slot />
  </section>
</template>
