import './commands'
import '@cypress/code-coverage/support'
import 'cypress-mailslurp'

before(() => {
  cy.mailslurp()
    .then((mailslurp) => mailslurp.createInbox())
    .then((inbox) => {
      cy.wrap(inbox.id).as('username')
      cy.wrap(inbox.emailAddress).as('email')
      cy.wrap(inbox.userId).as('password')
      cy.register(inbox.id, inbox.emailAddress, inbox.userId)
    })
})

after(() => {
  cy.clearUser()
})
