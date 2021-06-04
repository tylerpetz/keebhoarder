// https://docs.cypress.io/api/introduction/api.html

describe('Homepage', () => {
  it('visits the homepage', () => {
    cy.visit('/')
    cy.contains('h1', 'Keebhoarder')
  })
})
