import notificationPage from "../pages/notification-page";
import registrationPage from "../pages/register-page";

describe("Rolnopol app registration page tests", () => {
  it("Verify that users can register using all registration form fields", () => {
    registrationPage.visit();
    registrationPage.addRandomUser("testUser", true);
    notificationPage.assertSuccessNotification("Registration successful!");
    cy.location("pathname").should("eq", "/login.html");
  });

  it("Verify that users can register without filing optional registration form field", () => {
    registrationPage.visit();
    registrationPage.addRandomUser("testUser", false);
    notificationPage.assertSuccessNotification("Registration successful!");
    cy.location("pathname").should("eq", "/login.html");
  });

  it("Verify that duplicate users cannot be registered", () => {
    cy.registerUser(registrationPage.createRandomUser(), "testUser").then(
      function () {
        registrationPage.visit();
        registrationPage.fillRegistrationForm(
          this.testUser.email,
          this.testUser.displayName,
          this.testUser.password,
        );
        registrationPage.selectors.getCreateAccountButton().click();
        notificationPage.assertFailureNotification(
          "User with this email already exists",
        );
      },
    );
  });
});
