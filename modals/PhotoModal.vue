<script>
export default {
  name: 'PhotoModal',
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
    async uploadPhotos() {
      const photosData = new FormData()
      for (const i in this.files) {
        photosData.append(this.files[i].name, this.files[i])
      }
      const photos = await this.$store.dispatch(
        'photo/uploadPhotos',
        photosData
      )
      this.createPhotos(photos)
    },
    createPhotos(photos) {
      photos.forEach(async (photo) => {
        await this.$store.dispatch('photo/createPhoto', {
          photo: {
            uri: photo,
          },
        })
      })
      this.$closeModal()
    },
    askToClose() {
      if (this.files.length) {
        this.$closeModal()
      } else {
        const choice = confirm(
          'Are you sure you stop adding this photo? You will lose any unsaved changes.'
        )
        if (choice) {
          this.$closeModal()
        }
      }
    },
    onFileUpload(files) {
      this.files = [...this.files, ...files]
    },
  },
}
</script>

<template>
  <Modal
    modal-class="w-11/12 max-w-2xl lg:max-w-none xl:w-10/12 max-h-full"
    :click-bg-to-close="false"
    @close="askToClose"
  >
    <form @submit.prevent="uploadPhotos">
      <div class="flex flex-col w-full space-y-6 p-6">
        <file-drag-and-drop multiple @input="onFileUpload" />
        <div v-if="files.length" class="grid grid-cols-5 gap-x-4">
          <img
            v-for="(uploadPreview, index) in uploadPreviews"
            :key="index"
            :src="uploadPreview"
          />
        </div>
      </div>
      <footer class="bg-theme-bg-d p-2 flex justify-end space-x-4">
        <Keycap theme="accent" cap-style="large" type="submit">
          &#10229; Save Photo
        </Keycap>
      </footer>
    </form>
  </Modal>
</template>
