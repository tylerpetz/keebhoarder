describe('Home page auth modal - forgot password', () => {
  beforeEach(function () {
    cy.visit('/')
    cy.contains('button', 'Log In').click()
    cy.contains('[data-test=login-modal] button', 'Forgot Password?').click()
  })

  it('create an account button shows register modal', function () {
    cy.get('[data-test=forgot-password-modal]').should('be.visible')
  })

  it.skip('can send a forgot password email and receive it', function () {
    cy.get('[data-test=forgot-password-modal] [data-test="email"]').type(
      this.email
    )
    cy.get(
      '[data-test=forgot-password-modal] [data-test="submit-auth-form"]'
    ).click()
    cy.contains(
      'p',
      'Thanks, check your email for a link to reset your password.'
    )
    cy.mailslurp()
      .then((mailslurp) =>
        mailslurp.waitForLatestEmail(this.username, 30000, true)
      )
      .then((email) => expect(email.subject).to.contain('Reset password'))
  })
})
