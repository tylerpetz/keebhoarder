<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      orders: [],
      items: [],
    }
  },
  computed: {
    totalPrice() {
      if (!this.items.length) return 0
      return this.items.reduce((acc, cur) => acc.price + cur.price)
    },
  },
}
</script>

<template>
  <div>
    <div class="flex bg-theme-bg h-full text-theme-text-d" />
  </div>
</template>
