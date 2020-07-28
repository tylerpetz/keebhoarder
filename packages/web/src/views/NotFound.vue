<script>
export default {
  name: 'NotFound'
}
</script>

<template>

  <div>
    <h1>Page Not Found</h1>
    <keycap @click.native="$router.push({ name: 'Home' })">home</keycap>
  </div>
</template>
