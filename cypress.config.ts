import { defineConfig } from 'cypress';
import { allureCypress } from 'allure-cypress/reporter';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: 'allure-results',
      });

      return config;
    },
  },
});
