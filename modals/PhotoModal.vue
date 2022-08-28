<script>
import _isEqual from 'lodash/isEqual'
import _cloneDeep from 'lodash/cloneDeep'

const photoModel = {
  name: '',
  description: '',
  public: false,
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
  },
  data() {
    return {
      currentPhoto: photoModel,
      formattedPrice: this.photo?.price || 0,
      originalPhoto: photoModel,
      tempImage: '',
    }
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
          lists: [this.listId],
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
    onFileUpload(e) {
      const file = e.target.files[0]
      if (this.currentPhoto.photos == null) {
        this.currentPhoto.photos = []
      }

      // await this.$supabase.storage.from('photos').upload(file.name, file)
      // const { publicURL } = await this.$supabase.storage
      //   .from('photos')
      //   .getPublicUrl(file.name)
      // this.currentPhoto.photos.push(publicURL)

      const reader = new FileReader()
      reader.onload = (e) => {
        console.log(e)
      }
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        console.log(e)
      }
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
      <div
        class="flex flex-col lg:flex-row w-full space-y-6 lg:space-y-0 lg:space-x-6 p-6"
      >
        <div class="w-full lg:w-1/2">
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
        </div>
        <div class="w-full lg:w-1/2">
          <label class="block text-sm font-medium text-theme-text">
            File (PNG, JPG, GIF up to 10MB)
          </label>
          <div class="mt-1 sm:mt-0 sm:col-span-2 mb-6">
            <div
              class="w-full flex justify-center px-2 pt-4 pb-4 border border-theme-border border-dashed rounded-md relative"
            >
              <div class="space-y-1 text-center">
                <svg
                  class="mx-auto h-10 w-10 text-theme-link"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div
                  class="flex flex-col photos-center text-xs text-theme-text"
                >
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md font-medium text-theme-link hover:text-theme-link focus-within:outline-none focus-within:ring-2 focus-within:ring-theme-link"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      accept="image/*"
                      type="file"
                      class="sr-only"
                      @change="onFileUpload"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
              </div>
            </div>
            <!-- <div
              v-if="currentPhoto.photos && currentPhoto.photos.length"
              class="grid grid-cols-5 pt-6"
            >
              <img
                v-for="photo in currentPhoto.photos"
                :key="photo"
                :src="photo"
                class="h-full w-full inset-0 object-contain z-10"
                alt="cover image"
              />
            </div> -->
          </div>
        </div>
      </div>
      <footer class="bg-theme-bg-d p-2 flex justify-end">
        <Keycap
          theme="accent"
          cap-style="large"
          class="capitalize"
          type="submit"
        >
          &#10229; Save Photo
        </Keycap>
      </footer>
    </form>
  </Modal>
</template>
