const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  env: {
    email: process.env.CYPRESS_TEST_EMAIL,
    password: process.env.CYPRESS_TEST_PASS,
    MAILSLURP_API_KEY: process.env.CYPRESS_MAILSLURP_API_KEY,
  },
  fixturesFolder: 'tests/e2e/fixtures',
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/e2e/support/index.js',
    chromeWebSecurity: true,
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'))
      return config
    },
  },
  videoUploadOnPasses: false,
})
