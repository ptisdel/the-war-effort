describe('Client can join room', () => {
  it('visits the client site', () => {
    cy.visit(Cypress.env('CLIENT_URL'));
  });

  it('sets the operation name', () => {
    cy.get('[data-test-id=\'test-room\']')
      .invoke('text')
      .then(code => {
        const [adjective, noun] = code.split(' ');

        cy.get('#adjective')
          .select(adjective);

        cy.get('#noun')
          .select(noun);
      });
  });

  it('joins as an audience member', () => {
    cy.get('button[type=\'submit\']')
      .click();

    cy.get('h1')
      .contains('Audience Member');
  });
});

describe('Client can choose and resign from all roles', () => {

});
