describe('Client works as expected', () => {
  it('visits the client site', () => {
    cy.visit(Cypress.env('CLIENT_URL'));
  });
});
