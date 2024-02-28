const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "guirjp",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    specPattern: "cypress/e2e/**/*.js"
    },
  baseUrl: "https://pushing-it.vercel.app",
  fixturesFolder: "cypress/e2e/",
  defaultCommandTimeout: 5000
  },
});
