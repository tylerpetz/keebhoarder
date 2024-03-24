<script>
import _isEqual from 'lodash/isEqual'
import _cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'PhotoEditModal',
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
      currentPhoto: {},
      originalPhoto: {},
    }
  },
  created() {
    if (this.photo) {
      this.originalPhoto = _cloneDeep(this.photo)
      this.currentPhoto = {
        ...this.photo,
      }
    }
  },
  methods: {
    updatePhoto() {
      this.$store.dispatch('photo/updatePhoto', {
        photo: this.currentPhoto,
        updateCurrent: this.$route.name === 'photos-id',
      })
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
  },
}
</script>

<template>
  <Modal
    modal-class="w-11/12 max-w-2xl lg:max-w-none xl:w-10/12 max-h-full"
    :click-bg-to-close="false"
    @close="askToClose"
  >
    <form @submit.prevent="updatePhoto">
      <div class="flex flex-col w-full space-y-6 p-6">
        <div class="w-full lg:w-1/2">
          <img :src="photo.uri" class="mb-6" />
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
      </div>
      <footer class="bg-theme-bg-d p-2 flex justify-end space-x-4">
        <Keycap theme="accent" cap-style="large" type="submit">
          &#10229; Save Photo
        </Keycap>
      </footer>
    </form>
  </Modal>
</template>
