<script>
export default {
  name: 'PhotoDisplay',
  props: {
    photos: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<template>
  <div
    class="w-full grid grid-rows-4 grid-cols-4 gap-4 h-96"
    :class="`display-${photos.length}`"
  >
    <div
      v-for="(photo, index) in photos"
      :key="photo"
      :class="`div${index + 1}`"
    >
      <img :src="photo" class="object-cover h-96 w-full rounded" />
    </div>
  </div>
</template>

<style scoped>
.display-4 .div1 {
  grid-area: 1 / 1 / 5 / 3;
}
.display-4 .div2 {
  grid-area: 1 / 3 / 3 / 5;
}
.display-4 .div3 {
  grid-area: 3 / 3 / 5 / 4;
}
.display-4 .div4 {
  grid-area: 3 / 4 / 5 / 5;
}

.display-3 .div1 {
  grid-area: 1 / 1 / 5 / 3;
}
.display-3 .div2 {
  grid-area: 1 / 3 / 3 / 5;
}
.display-3 .div3 {
  grid-area: 3 / 3 / 5 / 5;
}

.display-2 .div1 {
  grid-area: 1 / 1 / 5 / 3;
}
.display-2 .div2 {
  grid-area: 1 / 3 / 5 / 5;
}

.display-1 .div1 {
  grid-area: 1 / 1 / 5 / 5;
}
</style>
