import { faker } from '@faker-js/faker';

type UserData = {
  email: string;
  displayName: string;
  password: string;
};

class RegisterPage {
  selectors = {
    getAuthInfoSection() {
      return cy.get('div.auth-info');
    },

    getEmailInput() {
      return cy.get('input#email');
    },

    getDisplayNameInput() {
      return cy.get('input#displayedName');
    },

    getPasswordInput() {
      return cy.get('input#password');
    },

    getCreateAccountButton() {
      return cy.get('button[data-testid=register-submit-btn]');
    },
  };

  visit(): void {
    cy.visit('/register.html');
  }

  fillRegistrationForm(email: string, displayName: string | undefined, password: string, createAccount = false): void {
    this.selectors.getEmailInput().clear().type(email);

    if (displayName) {
      this.selectors.getDisplayNameInput().clear().type(displayName);
    }

    this.selectors.getPasswordInput().clear().type(password);

    if (createAccount) {
      this.selectors.getCreateAccountButton().click();
    }
  }

  sanitizeDisplayName(displayName: string): string {
    return displayName
      .replace(/[^A-Za-z0-9 _-]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  createRandomUser(): UserData {
    const rawDisplayName = `${faker.person.firstName()} ${faker.person.lastName()}`;
    const displayName = this.sanitizeDisplayName(rawDisplayName);

    return {
      email: faker.internet.email(),
      displayName,
      password: faker.internet.password({ length: 10 }),
    };
  }

  addRandomUser(aliasName = 'testUser', includeDisplayName = true): Cypress.Chainable<UserData> {
    const user = this.createRandomUser();
    const displayName = includeDisplayName ? user.displayName : undefined;

    this.fillRegistrationForm(user.email, displayName, user.password);
    this.selectors.getCreateAccountButton().click();

    return cy.wrap(user).as(aliasName);
  }

  assertRegistrationGuidelinesSection(): void {
    const expectedTexts = [
      'Registration Guidelines',
      'Email:',
      'This will be used to sign in to your account.',
      "Make sure it's valid.",
      'Display Name:',
      'This is what others will see.',
      'If not provided, your email will be shown.',
    ];

    this.selectors
      .getAuthInfoSection()
      .should('be.visible')
      .within(() => {
        expectedTexts.forEach((text) => {
          cy.contains(text).should('be.visible');
        });

        cy.get('#password-guideline')
          .should('be.visible')
          .and('contain.text', 'Password: Must be at least 3 characters long.');
      });
  }
}

const registerPage = new RegisterPage();
export default registerPage;
