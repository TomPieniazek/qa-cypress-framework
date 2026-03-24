/// <reference types="cypress" />

import type {
  RegisterApiResponse,
  RegisterUserData,
  SystemStatistics,
} from "./commands";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Get system statistics from the API.
       */
      getSystemStatistics(): Chainable<SystemStatistics>;

      /**
       * Register a new user via API and wrap the user as an alias.
       */
      registerUser(
        user: RegisterUserData,
        aliasName?: string,
      ): Chainable<Cypress.Response<RegisterApiResponse>>;
    }
  }
}

export {};
