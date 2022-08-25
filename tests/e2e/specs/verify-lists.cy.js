// https://docs.cypress.io/api/introduction/api.html

describe.skip('List functionality', () => {
  before(() => {
    cy.login()
    cy.visit('/')
  })

  it.skip('navigates to lists', () => {
    cy.contains('header nav a', 'Lists').click()
    cy.url().should('include', '/lists')
    cy.contains('h3', 'Lists')
    cy.wait(1000)
  })

  // it('can create a list', () => {
  //   cy.contains('button', 'Create New List').click()
  //   cy.get('[data-test="list-modal"] [data-test="list-name"]').type('my wishlist')
  //   cy.get('[data-test="list-modal"] [data-test="list-description"]').type('all the stuff i want')
  //   cy.get('[data-test="list-modal"] [data-test="list-public"]').click()
  //   cy.get('[data-test="list-modal"] [data-test="list-save-button"]').click()
  //   cy.wait(1000)
  //   cy.get('#vgt-table tbody tr').first().within(() => {
  //     cy.contains('a', 'my wishlist')
  //     cy.contains('span', 'all the stuff i want')
  //     cy.get('[data-test=public-true]').should('be.visible')
  //   })
  // })

  // it('can update a list', () => {
  //   cy.get('#vgt-table tbody tr').first().within(() => {
  //     cy.get('[data-test=edit-list]').click()
  //   })
  //   cy.get('[data-test="list-modal"] [data-test="list-name"]').clear().type('my preciouses')
  //   cy.get('[data-test="list-modal"] [data-test="list-description"]').clear().type('all the stuff i own')
  //   cy.get('[data-test="list-modal"] [data-test="list-public"]').click()
  //   cy.get('[data-test="list-modal"] [data-test="list-save-button"]').click()
  //   cy.wait(1000)
  //   cy.get('#vgt-table tbody tr').first().within(() => {
  //     cy.contains('a', 'my preciouses')
  //     cy.contains('span', 'all the stuff i own')
  //     cy.get('[data-test=public-false]').should('be.visible')
  //   })
  // })
})
