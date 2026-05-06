import homePage from '../pages/home-page';

describe('Rolnopol app home page smoke', () => {
  it('Verify that home page displays correct data', () => {
    cy.getSystemStatistics().then((stats) => {
      homePage.visit();
      homePage.assertHeaderTitle();
      homePage.assertWelcomeSection();
      homePage.assertStatsFromApi(stats);
      homePage.selectors.getGetStartedFreeButton().should('be.visible');
      homePage.selectors.getSignInButton().should('be.visible');
    });
  });
});
