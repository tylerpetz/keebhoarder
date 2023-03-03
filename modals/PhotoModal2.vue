<script>
import _isEqual from 'lodash/isEqual'
import _cloneDeep from 'lodash/cloneDeep'

const photoModel = {
  name: '',
  description: '',
  public: true,
  uri: '',
}

export default {
  name: 'PhotoModal',
  props: {
    photo: {
      type: [Object, null],
      required: false,
      default: () => null,
    },
    listId: {
      type: [String, null],
      required: false,
      default: () => null,
    },
    itemId: {
      type: [String, null],
      required: false,
      default: () => null,
    },
  },
  data() {
    return {
      currentPhoto: { ...photoModel },
      originalPhoto: { ...photoModel },
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
  created() {
    if (this.photo) {
      this.originalPhoto = _cloneDeep(this.photo)
      this.currentPhoto = {
        ...photoModel,
        ...this.photo,
      }
    }
  },
  methods: {
    createOrUpdatePhoto() {
      if (this.photo) {
        this.$store.dispatch('photo/updatePhoto', {
          photo: this.currentPhoto,
          updateCurrent: this.$route.name === 'photos-id',
        })
      } else {
        this.$store.dispatch('photo/createPhoto', {
          photo: this.currentPhoto,
        })
      }
      this.$closeModal()
    },
    askToClose() {
      if (_isEqual(this.currentPhoto, this.originalPhoto)) {
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
      this.files = files
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
    <form @submit.prevent="createOrUpdatePhoto">
      <div class="flex flex-col w-full space-y-6 p-6">
        <!-- <div class="w-full lg:w-1/2">
          <form-input
            v-model="currentPhoto.name"
            class="w-full mb-6"
            type="text"
          >
            Name
          </form-input>

          <form-input
            v-model="currentPhoto.description"
            class="w-full mb-6"
            type="text"
          >
            Description
          </form-input>
          <form-toggle v-model="currentPhoto.public">
            <p class="font-medium text-theme-text text-sm">Public</p>
            <p class="text-theme-text-l text-xs">
              Allow other users to see this photo.
            </p>
          </form-toggle>
        </div> -->
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
