describe('Home page', function() {
  beforeEach(() => {
    cy.request('POST', '/api/tests/db/set-empty')
    cy.visit('/')
  })

  it('should have link PE connect', () => {
    cy.get('a')
      .contains('Se connecter avec mes identifiants Pôle Emploi')
      .should('have.length', 1)
  })

  it('should have a page title', () => {
    cy.get('h1')
      .contains("L'actualisation Pôle emploi en toute simplicité.")
      .should('have.length', 1)
  })
})