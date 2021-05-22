// https://docs.cypress.io/api/introduction/api.html

describe('Home page auth modal - login', () => {
  it('create an account button shows register modal', () => {
    cy.visit('/')
    cy.contains('button', 'Log In').click()
    cy.get('[data-test=login-modal]').should('be.visible')
  })

  it('bad login fails', () => {
    cy.get('[data-test=email]').type(this.email)
    cy.get('[data-test=password]').type('keebhoarder.com!!!!')
    cy.contains('[data-test=login-modal] button', 'Log In').click()
    cy.contains('[data-test=auth-error]', 'Incorrect email or password')
  })

  it('can log in and see username', () => {
    cy.get('[data-test=email]').clear().type(this.email)
    cy.get('[data-test=password]').clear().type('keebhoarder.com')
    cy.contains('[data-test=login-modal] button', 'Log In').click()
    cy.contains('header button', 'keeblord')
  })
})
