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

  // it('can receive forgot password email', function () {
  //   cy.mailslurp()
  //     .then(mailslurp => mailslurp.waitForLatestEmail(this.inboxId, 30000, true))
  //     .then(email => expect(email.subject).to.contain('Reset password'))
  // })
})
