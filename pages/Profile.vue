<script>
export default {
  name: 'NotFound',
}
</script>

<template>
  <div>
    <pre>{{ $store.getters['auth/currentUser'] }}</pre>
  </div>
</template>
