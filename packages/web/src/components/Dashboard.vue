<script>
export default {
  name: 'Dashboard'
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
    <div class="col-span-1 bg-alpha-cap rounded p-4">
      side
    </div>
    <div class="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-alpha-cap hover:bg-alpha-cap-hover rounded p-4">
        <h2 class="text-alpha-legend">Items in Hoard:</h2>
        <h3 class="text-alpha-legend-press">13</h3>
      </div>
      <div class="bg-white">Waiting on X Orders</div>
    </div>
  </div>
</template>
