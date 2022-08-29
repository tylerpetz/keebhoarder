<script>
import ModalList from '@/modals/index.js'

export default {
  name: 'App',
  components: {
    ModalList,
  },
  head() {
    return {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: this.$store.getters['app/themeFavicon'],
          id: 'favicon',
          hid: 'favicon',
        },
      ],
      bodyAttrs: {
        class: `scrollbar-thin scrollbar-track-theme-bg-d scrollbar-thumb-theme-link hover:scrollbar-thumb-theme-link-hover theme-${this.$store.state.app.activeTheme.id}`,
      },
    }
  },
  mounted() {
    if (this.$auth.user?.profile?.theme) {
      this.$store.dispatch('app/changeThemes', {
        id: this.$auth.user.profile.theme,
      })
    } else if (
      window.localStorage &&
      localStorage.getItem('activeTheme') &&
      JSON.parse(localStorage.getItem('activeTheme'))
    ) {
      this.$store.dispatch(
        'app/changeThemes',
        JSON.parse(localStorage.getItem('activeTheme'))
      )
    }
  },
}
</script>

<template>
  <main
    class="keebhoarder-theme bg-theme-bg font-body tracking-wider w-full min-h-screen h-full bg-caps flex flex-col pr-1 justify-between items-center relative"
  >
    <lazy-header-navigation />
    <Nuxt class="w-full flex-grow" />
    <site-footer />
    <modal-list />
    <system-messages />
  </main>
</template>
