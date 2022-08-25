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
  },
  videoUploadOnPasses: false,
})
