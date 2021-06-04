<script>
export default {
  name: 'NotFound',
}
</script>

<template>
  <div>
    <h1>Page Not Found</h1>
    <Keycap @click.native="$router.push({ name: 'index' })"> home </Keycap>
  </div>
</template>
