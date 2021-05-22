<script>
export default {
  name: 'AuthModal',
  props: {
    authType: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      errors: [],
      credentials: {
        username: '',
        email: '',
        password: '',
        passwordRepeat: ''
      }
    }
  },
  computed: {
    buttonText () {
      const types = {
        login: 'Log In',
        register: 'Register',
        'forgot-password': 'Send Reset Password Email'
      }
      return types[this.authType]
    },
    formFields () {
      return {
        login: ['email', 'password'],
        register: ['username', 'email', 'password', 'passwordRepeat'],
        'forgot-password': ['email', 'passwordPrompt']
      }
    }
  },
  methods: {
    forgotPassword () {
      this.$emit('close')
    },
    async handleSubmit () {
      const params = this.authType === 'register' ? this.credentials : { email: this.credentials.email, password: this.credentials.password }
      const auth = await this.$store.dispatch(`auth/${this.authType}`, params)
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
          v-if="showFormField('username')"
          v-model="credentials.username"
          required
          type="text"
          placeholder="keeblord"
          data-test="username"
        >
          Username
        </FormInput>
        <FormInput
          v-if="showFormField('email')"
          v-model="credentials.email"
          required
          type="email"
          placeholder="fam@keebhoarder.com"
          data-test="email"
        >
          Email Address
        </FormInput>
        <FormInput
          v-if="showFormField('password')"
          v-model="credentials.password"
          required
          type="password"
          placeholder="8+ characters, must include numbers or symbols"
          data-test="password"
        >
          Password
        </FormInput>
        <FormInput
          v-if="showFormField('passwordRepeat')"
          v-model="credentials.passwordRepeat"
          required
          type="password"
          data-test="password-again"
        >
          Type Password Again
        </FormInput>
        <span
          v-if="showFormField('passwordPrompt')"
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
        class="p-2 flex bg-theme-bg-d"
        :class="authType === 'login' ? 'justify-between' : 'justify-end'"
      >
        <Keycap
          v-if="authType === 'login'"
          theme="base"
          cap-style="large"
          data-test="forgot-password"
          @click.native="$showModal('AuthModal', { props: { authType: 'forgot-password' }})"
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
