/// <reference types="Cypress" />

context('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:80/login');
    cy.server();
    cy.route({ method: 'POST', url: 'http://localhost:8000/auth/jwt/create' }).as('auth');
  });

  it('should receive a 200 when login is successful', () => {
    cy.get("input[name='email']").type('jean_moust');
    cy.get("input[name='password']").type('lolilol');
    cy.get("button[type='submit']").click();
    cy.wait('@auth')
      .its('status')
      .should('be', 200);
  });

  it('backend should send a 401 when login fails', () => {
    cy.get("input[name='email']").type('some_random_dude');
    cy.get("input[name='password']").type('some_random_password');
    cy.get("button[type='submit']").click();
    cy.wait('@auth')
      .its('status')
      .should('be', 401);
  });

  it('should display an error message if no username is typed', () => {
    cy.get("button[type='submit']").click();
    cy.get('p')
      .invoke('text')
      .should(text => {
        expect(text).to.eq('Email required');
      });
  });
});
