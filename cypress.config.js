const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,
  },
  video: false,
})
