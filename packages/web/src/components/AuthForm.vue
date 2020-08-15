<script>
export default {
  name: 'AuthForm',
  props: {
    authType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      errors: []
    }
  },
  methods: {
    forgotPassword () {
      this.$emit('close')
    },
    login () {
      this.$emit('close')
    },
    register () {
      this.$emit('close')
    }
  }
}
</script>

<template>
  <Modal @close="$emit('close')" modalClass="w-72 sm:w-80 md:w-96">
    <form @submit.prevent="handleSubmit">
      <div class="flex flex-col p-6">
        <template v-if="authType === 'register'">
          <FormInput required class="mb-6" type="email" placeholder="fam@keebhoarder.com">Email Address</FormInput>
          <FormInput required class="mb-6" type="password" placeholder="8+ characters, must include numbers or symbols">Password</FormInput>
          <FormInput required class="mb-0" type="password">Type Password Again</FormInput>
        </template>
        <template v-else>
          <FormInput required class="mb-6">Username or Email Address</FormInput>
          <FormInput required class="mb-0" type="password">Password</FormInput>
        </template>
        <div v-if="errors.length" class="text-xs font-semibold text-theme-text rounded mt-4">Errors!</div>
      </div>
      <footer class="p-2 flex" :class="authType === 'login' ? 'justify-between' : 'justify-end'" slot="footer">
        <Keycap v-if="authType === 'login'" theme="base" cap-style="large" @click.native="forgotPassword">Forgot Password?</Keycap>
        <Keycap theme="mod" cap-style="large" class="capitalize" type="submit">&#10229; {{ authType === 'register' ? 'Register' : 'Log In'}}</Keycap>
      </footer>
      <aside slot="msg" class="absolute w-full text-center" style="top:100%;" v-if="authType === 'register'">
        <p class="text-xs font-semibold text-theme-text-l mt-2">we will never sell your email, but we might send you emails related to your account</p>
      </aside>
    </form>
  </Modal>
</template>
