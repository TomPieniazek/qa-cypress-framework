class HomePage {
  selectors = {
    getHeader() {
      return cy.get("body #home-legacy-header");
    },

    getHeaderTitle() {
      return this.getHeader().find(".main-title");
    },

    getWelcomeSection() {
      return cy.get(".welcome-section");
    },

    getGeneralStatsSection() {
      return cy.get("#general-stats");
    },

    getGetStartedFreeButton() {
      return cy.contains("a", "Get Started Free");
    },

    getSignInButton() {
      return cy.contains("a", "Sign In");
    },

    getActiveUsers() {
      return cy.get("#stat-users");
    },

    getManagedFarms() {
      return cy.get("#stat-farms");
    },

    getTotalArea() {
      return cy.get("#stat-area");
    },

    getTotalStaff() {
      return cy.get("#stat-staff");
    },

    getStockAnimals() {
      return cy.get("#stat-animals");
    },
  };

  visit() {
    cy.visit("/");
  }

  goToRegisterPage() {
    this.selectors.getGetStartedFreeButton().should("be.visible").click();
  }

  goToLoginPage() {
    this.selectors.getSignInButton().should("be.visible").click();
  }

  assertHeaderTitle() {
    this.selectors
      .getHeaderTitle()
      .should("be.visible")
      .and("have.text", "Rolnopol");
  }

  assertWelcomeSection() {
    this.selectors
      .getWelcomeSection()
      .should("be.visible")
      .and("contain.text", "Welcome to Rolnopol")
      .invoke("text")
      .then((text) => {
        const normalized = text.replace(/\s+/g, " ").trim();
        expect(normalized).to.contain(
          "Manage your farms, resources, and transactions in a secure, modern environment. Empowering staff, admins, and superadmins for the future of agriculture",
        );
      });
  }

  assertStats(activeUsers, managedFarms, totalArea, totalStaff, stockAnimals) {
    this.selectors.getGeneralStatsSection().should("be.visible");
    this.selectors.getActiveUsers().should("have.text", activeUsers);
    this.selectors.getManagedFarms().should("have.text", managedFarms);
    this.selectors.getTotalArea().should("have.text", totalArea);
    this.selectors.getTotalStaff().should("have.text", totalStaff);
    this.selectors.getStockAnimals().should("have.text", stockAnimals);
  }
}

module.exports = new HomePage();
