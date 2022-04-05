<script>
export default {
  name: 'Index',
}
</script>

<template>
  <div>
    <welcome-screen v-if="!$auth.loggedIn" />
    <lazy-website-dashboard v-else />
  </div>
</template>
