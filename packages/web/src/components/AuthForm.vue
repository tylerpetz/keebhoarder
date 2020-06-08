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
  <div class="w-1/4 min-w-64 relative">
    <div class="h-auto bg-theme-bg-alt flex flex-col justify-center p-6 rounded">
      <input class="mb-6 bg-alpha-cap hover:bg-alpha-cap-alt text-alpha-legend-alt placeholder-alpha-legend p-2 rounded" type="text" placeholder="username" />
      <input class="bg-alpha-cap hover:bg-alpha-cap-alt text-alpha-legend-alt placeholder-alpha-legend p-2 rounded" placeholder="email" />
      <template v-if="authType === 'register'">
        <input class="mb-6 mt-6 bg-alpha-cap hover:bg-alpha-cap-alt text-alpha-legend-alt placeholder-alpha-legend p-2 rounded" placeholder="password" />
        <input class="bg-alpha-cap hover:bg-alpha-cap-alt text-alpha-legend-alt placeholder-alpha-legend p-2 rounded" placeholder="type password again" />
      </template>
    </div>
    <div class="flex flex-row justify-between mt-6">
      <Shortcut :hotkeys="close" @click.native="$store.commit('SET_ACTIVE_MODAL', '')">Close</Shortcut>
      <Shortcut
        v-if="authType === 'login'"
        :hotkeys="forgotPassword">
        Forgot Password?
      </Shortcut>
      <Shortcut v-else :hotkeys="['Alt', 'L']" @click.native="$store.commit('SET_ACTIVE_MODAL', 'login')">Log In</Shortcut>
      <Shortcut :hotkeys="[{text: '&crarr; Enter', theme: 'accent', type: 'auto' }]" @click.native="$store.commit('SET_ACTIVE_MODAL', '')">Submit</Shortcut>
    </div>
  </div>
</template>
