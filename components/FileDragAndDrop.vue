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
      <div v-if="files.length" class="grid grid-cols-5 gap-x-4">
        <img
          v-for="(uploadPreview, index) in uploadPreviews"
          :key="index"
          :src="uploadPreview"
        />
      </div>
      <slot v-else>
        <strong>Upload File</strong>
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
  computed: {
    uploadPreviews() {
      return this.files.length
        ? this.files.map((file) => URL.createObjectURL(file))
        : []
    },
  },
  methods: {
    handleUpload(e) {
      this.files = Array.from(e.target.files) || []
      this.$emit('input', this.files)
    },
  },
}
</script>
