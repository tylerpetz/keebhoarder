// https://docs.cypress.io/api/introduction/api.html

describe('Home page auth modal - register', () => {
  it.only('create an account button shows register modal', () => {
    cy.visit('/')
    cy.contains('button', 'Create an Account').click()
    cy.get('[data-test=register-modal]').should('be.visible')
  })

  it('cannot register if formatting is wrong', function () {
    cy.get('[data-test=username]').type(this.username)
    cy.get('[data-test=email]').type(this.email)
    cy.get('[data-test=password]').type('password1')
    cy.get('[data-test=password-again]').type('password1!')
    cy.contains('button', 'Register').click()
    cy.contains('[data-test=auth-error]', 'Your passwords must match!')
    cy.get('[data-test=register-modal] [data-test=modal-bg]').click({
      force: true,
    })
  })

  it('cannot register if formatting is wrong 2', function () {
    cy.contains('button', 'Create an Account').click()
    cy.get('[data-test=register-modal]').should('be.visible')
    cy.get('[data-test=email]').type(this.email)
    cy.get('[data-test=password]').type('password1')
    cy.get('[data-test=password-again]').type('password1')
    cy.contains('button', 'Register').click()
    cy.get('[data-test=register-modal] input:invalid').should('have.length', 1)
    cy.get('[data-test=register-modal] [data-test=modal-bg]').click({
      force: true,
    })
  })

  it('can register', function () {
    cy.contains('button', 'Create an Account').click()
    cy.get('[data-test=register-modal]').should('be.visible')
    cy.get('[data-test=username]').type(this.username)
    cy.get('[data-test=email]').type(this.email)
    cy.get('[data-test=password]').type('password1')
    cy.get('[data-test=password-again]').type('password1')
    cy.contains('button', 'Register').click()
    cy.contains('header button', this.username)
  })

  it('can log out', function () {
    cy.contains('header button', this.username).click()
    cy.contains('header section button', 'Log Out').click()
    cy.contains('h1', 'Keebhoarder')
  })

  it('log in button shows log in modal', () => {
    cy.visit('/')
    cy.contains('button', 'Log In').click()
    cy.get('[data-test=login-modal]').should('be.visible')
  })

  it('bad login fails', function () {
    cy.get('[data-test=email]').type(this.email)
    cy.get('[data-test=password]').type('password1!!!')
    cy.contains('[data-test=login-modal] button', 'Log In').click()
    cy.contains('[data-test=auth-error]', 'Incorrect email or password')
  })

  it('can log in and see username', function () {
    cy.get('[data-test=email]').clear().type(this.email)
    cy.get('[data-test=password]').clear().type('password1')
    cy.contains('[data-test=login-modal] button', 'Log In').click()
    cy.contains('header button', this.username)
  })

  // it('can verify email address', function () {
  //   cy.mailslurp()
  //     .then(mailslurp => mailslurp.waitForLatestEmail(this.inboxId, 30000, true))
  //     .then(email => expect(email.subject).to.contain('Email Verification'))
  //     .then(email => /.*[a-z]+[:.].*?(?=\s).*/.exec(email.body)[1])
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
