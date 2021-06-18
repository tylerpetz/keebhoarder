<script>
export default {
  name: 'LoginRegisterModal',
  props: {
    authType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      credentials: {
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
      },
    }
  },
  computed: {
    buttonText() {
      const types = {
        login: 'Log In',
        register: 'Register',
      }
      return types[this.authType]
    },
    formFields() {
      return {
        login: ['email', 'password'],
        register: ['username', 'email', 'password', 'passwordRepeat'],
      }
    },
  },
  methods: {
    displayFormField(field) {
      return this.formFields[this.authType].includes(field)
    },
    async handleSubmit() {
      const params =
        this.authType === 'register'
          ? this.credentials
          : {
              email: this.credentials.email,
              password: this.credentials.password,
            }
      const auth = await this.$store.dispatch(`auth/${this.authType}`, params)
      if (auth === 'success') {
        this.$closeModal()
        if (this.authType === 'login') {
          this.$showMessage({
            title: 'Welcome back!',
            text: 'The keebs are waiting.',
            type: 'success',
          })
        } else {
          this.$showMessage({
            title: `Welcome ${this.credentials.username}!`,
            text: 'You addiction has been enabled',
            type: 'success',
          })
        }
      } else {
        this.$showMessage({
          title: 'Oops...',
          text: auth,
          type: 'error',
        })
      }
    },
  },
}
</script>

<template>
  <Modal
    modal-class="w-72 sm:w-80 md:w-96"
    :data-test="`${authType}-modal`"
    @close="$closeModal"
  >
    <form class="m-0 p-0" @submit.prevent="handleSubmit">
      <div class="flex flex-col p-6 space-y-6">
        <FormInput
          v-if="displayFormField('username')"
          v-model="credentials.username"
          required
          type="text"
          placeholder="keeblord"
          autocomplete="new-password"
          data-test="username"
        >
          Username
        </FormInput>
        <FormInput
          v-if="displayFormField('email')"
          v-model="credentials.email"
          required
          type="email"
          placeholder="fam@keebhoarder.com"
          autocomplete="new-password"
          data-test="email"
        >
          Email Address
        </FormInput>
        <FormInput
          v-if="displayFormField('password')"
          v-model="credentials.password"
          required
          type="password"
          placeholder="8+ characters, must include numbers or symbols"
          autocomplete="new-password"
          data-test="password"
        >
          Password
        </FormInput>
        <FormInput
          v-if="displayFormField('passwordRepeat')"
          v-model="credentials.passwordRepeat"
          required
          type="password"
          autocomplete="new-password"
          data-test="password-again"
        >
          Type Password Again
        </FormInput>
        <div
          v-if="$store.state.auth.error"
          class="text-xs font-semibold text-theme-link rounded"
          data-test="auth-error"
        >
          {{ $store.state.auth.error }}
        </div>
      </div>
      <footer
        class="p-2 flex bg-theme-bg-d"
        :class="authType === 'login' ? 'justify-between' : 'justify-end'"
      >
        <Keycap
          v-if="authType === 'login'"
          theme="base"
          cap-style="large"
          data-test="forgot-password"
          type="button"
          @click.native="$showModal('ForgotPasswordModal')"
        >
          Forgot Password?
        </Keycap>
        <Keycap
          theme="mod"
          cap-style="large"
          class="capitalize"
          data-test="submit-auth-form"
          type="submit"
        >
          &#10229; {{ buttonText }}
        </Keycap>
      </footer>
    </form>
  </Modal>
</template>
