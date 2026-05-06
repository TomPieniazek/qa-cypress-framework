class NotificationPage {
  selectors = {
    getNotificationContainer() {
      return cy.get('div.notifications-container');
    },

    getSuccessNotificationContainer() {
      return this.getNotificationContainer().find('div.notification.success');
    },

    getFailureNotificationContainer() {
      return this.getNotificationContainer().find('div.notification.error');
    },

    getNotificationTitle() {
      return cy.get('div.notification-title');
    },

    getNotificationMessage() {
      return cy.get('div.notification-message');
    },

    getNotificationPopupCloseButton() {
      return cy.get('button.notification-close');
    },
  };

  closeNotification(closePopup: boolean) {
    if (closePopup) {
      this.selectors.getNotificationPopupCloseButton().click();
      this.selectors.getNotificationContainer().should('not.be.visible');
    }
  }

  assertSuccessNotification(message: string, title = 'Success', closePopup = true): void {
    this.selectors.getSuccessNotificationContainer().should('be.visible');
    this.selectors.getNotificationTitle().should('have.text', title);
    this.selectors.getNotificationMessage().should('have.text', message);
    this.closeNotification(closePopup);
  }

  assertFailureNotification(message: string, title = 'Error', closePopup = true): void {
    this.selectors.getFailureNotificationContainer().should('be.visible');
    this.selectors.getNotificationTitle().should('have.text', title);
    this.selectors.getNotificationMessage().should('have.text', message);
    this.closeNotification(closePopup);
  }
}

const notificationPage = new NotificationPage();
export default notificationPage;
