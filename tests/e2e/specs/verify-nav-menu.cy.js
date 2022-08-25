// https://docs.cypress.io/api/introduction/api.html

describe.skip('Nav Menu - logged in user', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('shows logged in nav', () => {
    cy.contains('header button', 'testguy')
    cy.contains('header nav a', 'Lists')
    cy.contains('header nav a', 'Items')
  })

  it('shows logged in subnav', () => {
    cy.contains('header button', 'testguy').click()
    cy.contains('header section a', 'Profile')
    cy.contains('header section button', 'Swap Keycaps')
    cy.contains('header section button', 'Esc')
  })

  it.skip('logs out', () => {
    cy.contains('header section button', 'Log Out').click()
    cy.contains('h1', 'Keebhoarder')
  })
})
