<script>
export default {
  name: 'AuthForm',
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
      username: '',
      email: '',
      password: '',
      passwordRepeat: ''
    }
  },
  mounted () {
    console.log(this.axios)
  },
  methods: {
    forgotPassword () {
      this.$emit('close')
    },
    async handleSubmit () {
      await this.$store.dispatch(`auth/${this.authType}`, { username: this.username, email: this.email, password: this.password })
      this.$emit('close')
    }
  }
}
</script>

<template>
  <Modal
    modal-class="w-72 sm:w-80 md:w-96"
    :show="show"
    @close="$emit('close')"
  >
    <form
      class="m-0 p-0"
      @keydown.enter="handleSubmit"
      @submit.prevent="handleSubmit"
    >
      <div class="flex flex-col p-6">
        <template v-if="authType === 'register'">
          <FormInput
            v-model="username"
            required
            class="mb-6"
            type="text"
            placeholder="keeblord"
          >
            Username
          </FormInput>
          <FormInput
            v-model="email"
            required
            class="mb-6"
            type="email"
            placeholder="fam@keebhoarder.com"
          >
            Email Address
          </FormInput>
          <FormInput
            v-model="password"
            required
            class="mb-6"
            type="password"
            placeholder="8+ characters, must include numbers or symbols"
          >
            Password
          </FormInput>
          <FormInput
            v-model="passwordRepeat"
            required
            class="mb-0"
            type="password"
          >
            Type Password Again
          </FormInput>
        </template>
        <template v-else>
          <FormInput
            v-model="email"
            required
            class="mb-6"
          >
            Username or Email Address
          </FormInput>
          <FormInput
            v-model="password"
            required
            class="mb-0"
            type="password"
          >
            Password
          </FormInput>
        </template>
        <div
          v-if="errors.length"
          class="text-xs font-semibold text-theme-text rounded mt-4"
        >
          Errors!
        </div>
      </div>
      <footer
        slot="footer"
        class="p-2 flex bg-theme-bg-d"
        :class="authType === 'login' ? 'justify-between' : 'justify-end'"
      >
        <Keycap
          v-if="authType === 'login'"
          theme="base"
          cap-style="large"
          data-test="forgot-password"
          @click.native="forgotPassword"
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
          &#10229; {{ authType === 'register' ? 'Register' : 'Log In' }}
        </Keycap>
      </footer>
      <!-- <aside slot="msg" class="absolute w-full text-center" style="top:100%;" v-if="authType === 'register'">
        <p class="text-xs font-semibold text-theme-text-l mt-2">we will never sell your email, but we might send you emails related to your account</p>
      </aside> -->
    </form>
  </Modal>
</template>
