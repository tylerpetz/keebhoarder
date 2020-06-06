<script>
export default {
  name: 'AuthForm',
  props: {
    authType: {
      type: String,
      default: ''
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
      <button class="text-theme-text hover:text-theme-text-alt cursor-pointer text-xs flex items-center" @click="$emit('close')">
        Close <Keycap theme="mod">Esc</Keycap>
      </button>
      <button v-if="authType === 'login'" class="text-theme-text hover:text-theme-text-alt cursor-pointer text-xs flex items-center" @click="$emit('close')">
        Forgot Password <Keycap class="mr-1">Alt</Keycap> + <Keycap class="ml-1">F</Keycap>
      </button>
      <button v-else class="text-theme-text hover:text-theme-text-alt cursor-pointer text-xs flex items-center" @click="$emit('close')">
        Log In <Keycap class="mr-1">Alt</Keycap>+<Keycap class="ml-1">L</Keycap>
      </button>
      <button class="text-theme-text hover:text-theme-text-alt cursor-pointer text-xs flex items-center" @click="$emit('close')">
        Submit <Keycap theme="accent">&crarr;</Keycap>
      </button>
    </div>
  </div>
</template>
