// https://docs.cypress.io/api/introduction/api.html

describe('Home page auth modal - register', () => {
  it('create an account button shows register modal', () => {
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
    cy.get('[data-test=register-modal] [data-test=modal-bg]').click({ force: true })
  })

  it('cannot register if formatting is wrong 2', function () {
    cy.contains('button', 'Create an Account').click()
    cy.get('[data-test=register-modal]').should('be.visible')
    cy.get('[data-test=email]').type(this.email)
    cy.get('[data-test=password]').type('password1')
    cy.get('[data-test=password-again]').type('password1')
    cy.contains('button', 'Register').click()
    cy.get('[data-test=register-modal] input:invalid').should('have.length', 1)
    cy.get('[data-test=register-modal] [data-test=modal-bg]').click({ force: true })
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
})
