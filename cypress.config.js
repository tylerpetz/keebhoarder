const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    email: 'fake@example.com',
    password: 'password1',
  },
  fixturesFolder: 'tests/e2e/fixtures',
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/e2e/support/index.js',
    experimentalSessionAndOrigin: true,
    chromeWebSecurity: true,
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config
    },
  },
  videoUploadOnPasses: false,
})
