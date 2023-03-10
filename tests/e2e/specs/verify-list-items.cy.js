// https://docs.cypress.io/api/introduction/api.html

describe('ListItem functionality', () => {
  beforeEach(() => {
    cy.login()
  })

  // create list
  // view list
  // add item to list
  it.skip('can add an item to a list', () => {
    cy.visitLists()
    cy.createList()
  })

  // create list
  // create item
  // view item
  // add item to list
  it.skip('can move an existing item to a list', () => {
    cy.visitLists()
    cy.createList()
    cy.visitItems()
  })
})
