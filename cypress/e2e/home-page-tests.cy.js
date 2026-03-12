const homePage = require("../pages/home-page");

describe("Rolnopol app home page smoke", () => {
  it("Verify that home page displays correct data", () => {
    homePage.visit();
    homePage.assertHeaderTitle();
    homePage.assertWelcomeSection();
    homePage.assertStats(10, 10, "5,8K ha", 15, "2,6K");
    homePage.selectors.getGetStartedFreeButton().should("be.visible");
    homePage.selectors.getSignInButton().should("be.visible");
  });
});
