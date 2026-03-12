describe('Rolnopol app smoke', () => {
  it('loads home page', () => {
    cy.visit('/');
    cy.get('body').should('be.visible');
    cy.get('#stat-farms').should('have.text', 10);
  });
});
