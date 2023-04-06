describe.skip('ItemPhoto functionality', () => {
  beforeEach(() => {
    cy.login()
    cy.clearLists()
    cy.clearItems()
  })

  it('can add a photo to an item', () => {
    cy.visitLists()
    cy.createList()
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.contains('a', 'test').click()
      })
    cy.url().should('contain', 'lists/')
    cy.get('[data-test="list-name"]').contains('test')
    cy.get('[data-test="add-item-to-list"]').click()
    cy.get('[data-test="item-modal"] [data-test="item-name"]').type(
      'test list item'
    )
    cy.get('[data-test="item-modal"] [data-test="item-description"]').type(
      'test list item'
    )
    cy.get('[data-test="item-modal"] [data-test="item-public"]').click()
    cy.get('[data-test="item-modal"] [data-test="item-save-button"]').click()
    cy.wait(1000)
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.contains('a', 'test list item')
        cy.contains('span', 'test list item')
        cy.get('[data-test=public-true]').should('be.visible')
      })
  })

  // create list
  // create item
  // view item
  // add item to list
  it('can move an existing photo to an item', () => {
    cy.visitLists()
    cy.createList()
    cy.visitItems()
  })

  // can remove photo from item

  // can add photo to multiple items
})
