// https://docs.cypress.io/api/introduction/api.html

describe('Home page auth modal - login', () => {
  it('create an account button shows register modal', () => {
    cy.visit('/')
    cy.contains('button', 'Log In').click()
    cy.get('[data-test=login-modal]').should('be.visible')
  })

  it('bad login fails', () => {
    cy.get('[data-test=email-or-username]').type(Cypress.env('email'))
    cy.get('[data-test=password]').type(`${Cypress.env('password')}!!!!`)
    cy.contains('[data-test=login-modal] button', 'Log In').click()
    cy.contains('[data-test=auth-error]', 'Incorrect email or password')
  })

  it('can log in and see username', () => {
    cy.get('[data-test=email-or-username]').clear().type(Cypress.env('email'))
    cy.get('[data-test=password]').clear().type(Cypress.env('password'))
    cy.contains('[data-test=login-modal] button', 'Log In').click()
    cy.contains('header button', 'keeblord')
  })
})
