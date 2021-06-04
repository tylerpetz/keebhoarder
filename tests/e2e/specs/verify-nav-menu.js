// https://docs.cypress.io/api/introduction/api.html

describe('Nav Menu - logged in user', () => {
  before(() => {
    cy.login()
  })

  it('shows logged in nav', () => {
    cy.contains('header button', 'keeblord')
    cy.contains('header nav a', 'Lists')
    cy.contains('header nav a', 'Items')
    cy.contains('header nav a', 'Orders')
  })

  it('shows logged in subnav', () => {
    cy.contains('header button', 'keeblord').click()
    cy.contains('header section a', 'Profile')
    cy.contains('header section button', 'Swap Keycaps')
    cy.contains('header section button', 'Esc')
  })

  it('logs out', () => {
    cy.contains('header section button', 'Log Out').click()
    cy.contains('h1', 'Keebhoarder')
  })
})
