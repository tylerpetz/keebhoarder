import './commands'
import '@cypress/code-coverage/support'
import 'cypress-mailslurp'

before(() => {
  cy.mailslurp()
    .then((mailslurp) =>
      mailslurp.getInbox('682e96c7-995d-4e04-9da1-12a5ec2239dc')
    )
    .then((inbox) => {
      cy.wrap(inbox.id).as('username')
      cy.wrap(inbox.emailAddress).as('email')
      cy.wrap(inbox.userId).as('password')
      cy.register(inbox.id, inbox.emailAddress, inbox.userId)
    })
})

after(() => {
  cy.login()
  cy.clearUser()
})
