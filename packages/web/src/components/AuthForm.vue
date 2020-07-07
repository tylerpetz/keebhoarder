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
      forgotPassword: [
        {
          text: 'Alt',
          type: 'mod'
        }
      ],
      close: [
        {
          text: 'Esc',
          theme: 'accent'
        }
      ]
    }
  }
}
</script>

<template>
  <Modal @close="$emit('close')">
    <div class="flex flex-col p-6">
      <template v-if="authType === 'register'">
        <FormInput class="mb-6" type="email" placeholder="fam@keebhoarder.com">Email Address</FormInput>
        <FormInput class="mb-6" type="password" placeholder="8+ characters, must include numbers or symbols">Password</FormInput>
        <FormInput class="mb-0" type="password">Type Password Again</FormInput>
      </template>
      <template v-else>
        <FormInput class="mb-6">Username or Email Address</FormInput>
        <FormInput class="mb-0" type="password">Password</FormInput>
      </template>
      <!-- <div class="text-xs font-semibold text-theme-text rounded mt-4">Errors!</div> -->
    </div>
    <footer class="p-2 flex" :class="authType === 'login' ? 'justify-between' : 'justify-end'" slot="footer">
      <Keycap theme="base" capStyle="large" @click.native="$emit('close')" v-if="authType === 'login'">Forgot Password?</Keycap>
      <Keycap theme="mod" capStyle="large" @click.native="$emit('close')" class="capitalize">&#10229; {{ authType }}</Keycap>
    </footer>
    <aside slot="msg" class="absolute w-full text-center" style="top:100%;" v-if="authType === 'register'">
      <p class="text-xs font-semibold text-accent-cap-hover mt-2">we will never sell your email, but we might send you emails related to your account</p>
    </aside>
  </Modal>
</template>
