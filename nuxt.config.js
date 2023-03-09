export default {
  server: {
    port: 8080,
  },
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'keebhoarder',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'manage and share your mechanical keyboard collection',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.css', '@/assets/themes.css', '@/assets/table.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/plugins', mode: 'client' },
    { src: '~/plugins/tables', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://typescript.nuxtjs.org/
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    // https://google-fonts.nuxtjs.org/setup
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://axios.nuxtjs.org/
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/guide/setup
    '@nuxtjs/auth-next',
    // https://vue-currency-input-v1.netlify.app/guide/#installation
    [
      'vue-currency-input/nuxt',
      {
        globalOptions: {
          currency: 'USD',
          locale: 'en',
          valueAsInteger: true,
          distractionFree: {
            hideNegligibleDecimalDigits: false,
            hideCurrencySymbol: true,
            hideGroupingSymbol: true,
          },
          valueRange: { min: 0 },
          allowNegative: false,
        },
      },
    ],
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: ['babel-plugin-istanbul'],
    },
  },
  serverMiddleware: ['~/prisma/index.ts'],
  ignore: ['~/coverage/**/*'],
  googleFonts: {
    display: 'swap',
    families: {
      Nunito: {
        wght: [400, 600, 700, 800],
      },
    },
  },
  axios: {
    baseURL: 'http://localhost:8080/api', // Used as fallback if no runtime config is provided
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: false,
          user: { url: '/me', method: 'get' },
        },
      },
    },
  },
}
