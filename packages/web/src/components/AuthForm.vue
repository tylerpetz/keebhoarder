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
    <div class="flex flex-col flex-wrap justify-center items-center h-64">
      <input class="mb-6 bg-alpha-cap hover:bg-alpha-cap-alt text-alpha-legend-alt placeholder-alpha-legend p-2 rounded" type="text" placeholder="username" />
      <input class="bg-alpha-cap hover:bg-alpha-cap-alt text-alpha-legend-alt placeholder-alpha-legend p-2 rounded" placeholder="email" />
      <template v-if="authType === 'register'">
        <input class="mb-6 mt-6 bg-alpha-cap hover:bg-alpha-cap-alt text-alpha-legend-alt placeholder-alpha-legend p-2 rounded" placeholder="password" />
        <input class="bg-alpha-cap hover:bg-alpha-cap-alt text-alpha-legend-alt placeholder-alpha-legend p-2 rounded" placeholder="type password again" />
      </template>
    </div>
    <footer class="p-2 flex justify-between" slot="footer">
      <Keycap theme="base" capStyle="large" @click.native="$emit('close')" class="ml-0">Forgot Password?</Keycap>
      <Keycap theme="mod" capStyle="large" @click.native="$emit('close')" class="mr-0">&crarr; Log In</Keycap>
    </footer>
  </Modal>
</template>
