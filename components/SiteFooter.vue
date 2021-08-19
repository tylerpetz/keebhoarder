<script>
export default {
  name: 'SiteFooter',
}
</script>

<template>
  <footer
    class="left-0 w-full px-3 py-2 flex justify-between"
    :class="{ 'bg-theme-bg-d': $store.getters.loggedIn }"
  >
    <p class="text-theme-text text-xs">&copy; 2021 keebhoarder</p>
    <p class="text-theme-text text-xs pr-1">
      <!-- about - help - donate -->
      <a
        href="https://github.com/tylerpetz/keebhoarder/issues/new"
        target="_blank"
        rel="noopener"
      >
        Issues?
      </a>
    </p>
  </footer>
</template>
