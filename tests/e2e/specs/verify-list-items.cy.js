// https://docs.cypress.io/api/introduction/api.html

describe('ListItem functionality', () => {
  beforeEach(() => {
    cy.login()
    cy.intercept('GET', '/api/items*').as('getItems')
    cy.visit('/items')
    cy.wait('@getItems')
  })

  // create list
  // view list
  // add item to list

  // create list
  // create item
  // view item
  // add item to list
})
