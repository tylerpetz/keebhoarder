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
    <div class="flex flex-col p-2">
      <input class="mb-2 bg-alpha-cap hover:bg-alpha-cap-alt text-alpha-legend-alt placeholder-alpha-legend p-2 rounded text-sm" type="text" placeholder="username" />
      <input class="bg-alpha-cap hover:bg-alpha-cap-alt text-alpha-legend-alt placeholder-alpha-legend p-2 rounded text-sm" placeholder="email" />
      <template v-if="authType === 'register'">
        <input class="my-2 bg-alpha-cap hover:bg-alpha-cap-alt text-alpha-legend-alt placeholder-alpha-legend p-2 rounded text-sm" placeholder="password" />
        <input class="bg-alpha-cap hover:bg-alpha-cap-alt text-alpha-legend-alt placeholder-alpha-legend p-2 rounded text-sm" placeholder="type password again" />
      </template>
    </div>
    <footer class="p-2 flex justify-between" slot="footer">
      <Keycap theme="base" capStyle="large" @click.native="$emit('close')" class="ml-0 mr-0">Forgot Password?</Keycap>
      <Keycap theme="mod" capStyle="large" @click.native="$emit('close')" class="ml-0 mr-0">&crarr; Log In</Keycap>
    </footer>
    <aside slot="msg" class="absolute w-full text-center mt-4">
      <p class="text-sm font-semibold text-accent-cap-hover">username is available!</p>
      <p class="text-sm font-semibold text-accent-cap-hover">we will never sell your email</p>
      <p class="text-sm font-semibold text-accent-cap-hover">password must be good</p>
      <p class="text-sm font-semibold text-accent-cap-hover">type it again (feels nice)</p>
    </aside>
  </Modal>
</template>
