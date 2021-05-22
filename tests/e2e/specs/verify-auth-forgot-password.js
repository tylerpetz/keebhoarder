// https://docs.cypress.io/api/introduction/api.html

describe('Home page auth modal - forgot password', () => {
  it('create an account button shows register modal', () => {
    cy.visit('/')
    cy.contains('button', 'Log In').click()
    cy.get('[data-test=login-modal]').should('be.visible')
    cy.contains('[data-test=login-modal] button', 'Forgot Password?').click()
    cy.get('[data-test=forgot-password-modal]').should('be.visible')
  })

  // it('can send a forgot password email', function () {
  //   cy.get('[data-test=forgot-password-modal] [data-test="email"]').type(this.email)
  //   cy.get('[data-test=forgot-password-modal] [data-test="submit-auth-form"]').click()
  //   cy.contains('p', 'Thanks, check your email for a link to reset your password.')
  // })

  // it('cannot register if formatting is wrong', () => {
  //   cy.get('[data-test=username]').type('sup')
  //   cy.get('[data-test=email]').type('fakeuser@fakeplace.com')
  //   cy.get('[data-test=password]').type('keebhoarder.com')
  //   cy.get('[data-test=password-again]').type('keebhoarder.com!')
  //   cy.contains('button', 'Register').click()
  //   cy.contains('[data-test=auth-error]', 'Your passwords must match!')
  //   cy.get('[data-test=register-modal] [data-test=modal-bg]').click({ force: true })
  // })

  // it('cannot register if formatting is wrong 2', () => {
  //   cy.contains('button', 'Create an Account').click()
  //   cy.get('[data-test=register-modal]').should('be.visible')
  //   cy.get('[data-test=email]').type('fakeplace.com')
  //   cy.get('[data-test=password]').type('keebhoarder.com')
  //   cy.get('[data-test=password-again]').type('keebhoarder.com')
  //   cy.contains('button', 'Register').click()
  //   cy.get('[data-test=register-modal] input:invalid').should('have.length', 2)
  //   cy.get('[data-test=register-modal] [data-test=modal-bg]').click({ force: true })
  // })
})
