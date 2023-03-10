<template>
  <label class="block h-64 relative overflow-hidden rounded">
    <input
      type="file"
      class="hidden"
      :multiple="multiple"
      @change="handleUpload"
    />
    <span
      class="absolute top-0 left-0 right-0 bottom-0 w-full bg-theme-bg-l border-theme-border border-2 border-dashed text-theme-text pointer-events-none flex-col flex justify-center items-center text-center"
    >
      <slot>
        <strong>Upload Photo(s)</strong>
      </slot>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      files: [],
    }
  },
  methods: {
    handleUpload(e) {
      this.files = Array.from(e.target.files) || []
      this.$emit('input', this.files)
    },
  },
}
</script>
