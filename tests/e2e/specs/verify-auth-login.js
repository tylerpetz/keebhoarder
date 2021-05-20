// https://docs.cypress.io/api/introduction/api.html

describe('Login from homepage', () => {
  it('create an account button shows register modal', () => {
    cy.visit('/')
    cy.contains('button', 'Log In').click()
    cy.get('[data-test=login-modal]').should('be.visible')
  })

  it('cannot register if formatting is wrong', () => {
    cy.get('[data-test=email-or-username]').type('fake@example.com')
    cy.get('[data-test=password]').type('98custom')
    cy.contains('[data-test=login-modal] button', 'Log In').click()
    cy.contains('header button', 'keeblord')
  })
})
