<script>
export default {
  name: 'ForgotPasswordModal',
  data () {
    return {
      credentials: {
        email: ''
      }
    }
  },
  methods: {
    async handleSubmit () {
      const auth = await this.$store.dispatch('auth/forgotPassword', this.credentials)
      if (auth === 'success') {
        this.$closeModal()
      }
    },
    showFormField (field) {
      return this.formFields[this.authType].includes(field)
    }
  }
}
</script>

<template>
  <Modal
    modal-class="w-72 sm:w-80 md:w-96"
    :data-test="`${authType}-modal`"
    @close="$closeModal"
  >
    <form
      class="m-0 p-0"
      @keydown.enter="handleSubmit"
      @submit.prevent="handleSubmit"
    >
      <div class="flex flex-col p-6 space-y-6">
        <FormInput
          v-model="credentials.email"
          required
          type="email"
          placeholder="fam@keebhoarder.com"
          data-test="email"
        >
          Email Address
        </FormInput>
        <span
          class="text-xs font-semibold text-theme-text rounded"
        >
          Enter your email and we'll send you a link to reset your password.
        </span>
        <div
          v-if="$store.state.auth.error"
          class="text-xs font-semibold text-theme-link rounded"
          data-test="auth-error"
        >
          {{ $store.state.auth.error }}
        </div>
      </div>
      <footer
        class="p-2 flex bg-theme-bg-d justify-end"
      >
        <Keycap
          theme="mod"
          cap-style="large"
          class="capitalize"
          data-test="submit-auth-form"
          type="submit"
        >
          &#10229; Send Reset Password Email
        </Keycap>
      </footer>
    </form>
  </Modal>
</template>
