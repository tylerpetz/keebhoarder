<script>
export default {
  name: 'FormInput',
  props: {
    inputProperties: {
      type: Object,
      default: () => ({
        placeholder: '',
        type: ''
      })
    }
  }
}
</script>

<template>
  <label class="relative flex flex-col w-full">
    <span class="text-alpha-legend text-xs"><slot /></span>
    <input class="bg-alpha-cap hover:bg-alpha-cap-hover text-alpha-legend-press placeholder-alpha-legend-hover p-2 rounded text-sm" :type="inputProperties.type || 'text'" :placeholder="inputProperties.placeholder" />
  </label>
</template>
