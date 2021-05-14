<script>
export default {
  name: 'SiteFooter'
}
</script>

<template>
  <footer
    class="w-full px-3 py-2 flex justify-end"
    :class="{ 'bg-theme-bg-d': $store.getters.loggedIn }"
  >
    <p class="text-theme-text text-xs">
      &copy; 2021 keebhoarder
    </p>
    <!-- <p class="text-theme-text text-xs pr-1">
      about - help - donate
    </p> -->
  </footer>
</template>
