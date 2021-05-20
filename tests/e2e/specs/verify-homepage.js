// https://docs.cypress.io/api/introduction/api.html

describe('Homepage tests', () => {
  it('visits the homepage', () => {
    cy.visit('/')
    cy.contains('h1', 'Keebhoarder')
  })
})
