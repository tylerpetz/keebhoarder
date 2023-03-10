// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@cypress/code-coverage/support'
// import 'cypress-mailslurp'

// before(() => {
//   // cy.mailslurp()
//   //   .then((mailslurp) => mailslurp.createInbox())
//   //   .then((inbox) => {
//   //     cy.log(inbox)
//   //     // save inbox id and email address to this (make sure you use function and not arrow syntax)
//   //     cy.wrap(inbox.id).as('inboxId')
//   //     cy.wrap(inbox.id).as('username')
//   //     cy.wrap(inbox.emailAddress).as('email')
//   //   })
//   cy.visit('/')
// })
