import type { SystemStatistics } from '../support/commands';

class HomePage {
  selectors = {
    getHeader() {
      return cy.get('body #home-legacy-header');
    },

    getHeaderTitle() {
      return this.getHeader().find('.main-title');
    },

    getWelcomeSection() {
      return cy.get('.welcome-section');
    },

    getGeneralStatsSection() {
      return cy.get('#general-stats');
    },

    getGetStartedFreeButton() {
      return cy.contains('a', 'Get Started Free');
    },

    getSignInButton() {
      return cy.contains('a', 'Sign In');
    },

    getActiveUsers() {
      return cy.get('#stat-users');
    },

    getManagedFarms() {
      return cy.get('#stat-farms');
    },

    getTotalArea() {
      return cy.get('#stat-area');
    },

    getTotalStaff() {
      return cy.get('#stat-staff');
    },

    getStockAnimals() {
      return cy.get('#stat-animals');
    },
  };

  visit(): void {
    cy.visit('/');
  }

  goToRegisterPage(): void {
    this.selectors.getGetStartedFreeButton().should('be.visible').click();
  }

  goToLoginPage(): void {
    this.selectors.getSignInButton().should('be.visible').click();
  }

  assertHeaderTitle(): void {
    this.selectors.getHeaderTitle().should('be.visible').and('have.text', 'Rolnopol');
  }

  assertWelcomeSection(): void {
    this.selectors
      .getWelcomeSection()
      .should('be.visible')
      .and('contain.text', 'Welcome to Rolnopol')
      .invoke('text')
      .then((text) => {
        const normalized = text.replace(/\s+/g, ' ').trim();
        expect(normalized).to.contain(
          'Manage your farms, resources, and transactions in a secure, modern environment. Empowering staff, admins, and superadmins for the future of agriculture',
        );
      });
  }

  formatCompactNumber(value: number): string {
    if (value >= 1000) {
      const rounded = Math.round(value / 100) / 10;
      const withOneDecimal = rounded.toFixed(1).replace(/\.0$/, '');
      return `${withOneDecimal}`.replace('.', ',') + 'K';
    }

    return String(value);
  }

  assertStats(
    activeUsers: string,
    managedFarms: string,
    totalArea: string,
    totalStaff: string,
    stockAnimals: string,
  ): void {
    this.selectors.getGeneralStatsSection().should('be.visible');
    this.selectors.getActiveUsers().should('have.text', activeUsers);
    this.selectors.getManagedFarms().should('have.text', managedFarms);
    this.selectors.getTotalArea().should('have.text', totalArea);
    this.selectors.getTotalStaff().should('have.text', totalStaff);
    this.selectors.getStockAnimals().should('have.text', stockAnimals);
  }

  assertStatsFromApi(stats: SystemStatistics): void {
    const activeUsers = String(stats.users);
    const managedFarms = String(stats.farms);
    const totalArea = `${this.formatCompactNumber(stats.area)} ha`;
    const totalStaff = String(stats.staff);
    const stockAnimals = this.formatCompactNumber(stats.animals);

    this.assertStats(activeUsers, managedFarms, totalArea, totalStaff, stockAnimals);
  }
}

const homePage = new HomePage();
export default homePage;
