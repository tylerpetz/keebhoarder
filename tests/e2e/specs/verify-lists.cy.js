// https://docs.cypress.io/api/introduction/api.html

describe('List functionality', () => {
  before(() => {
    cy.login()
    cy.clearLists()
  })

  beforeEach(() => {
    cy.login()
    cy.visitLists()
  })

  it('can navigate to lists', () => {
    cy.visit('/')
    cy.contains('header nav a', 'Lists').click()
    cy.url().should('include', '/lists')
    cy.contains('h3', 'Lists')
  })

  it('can create a list', () => {
    cy.createList('my wishlist', 'please buy 4 me')
  })

  it('can view a list', () => {
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.get('a')
          .first()
          .then(($link) => {
            const href = $link.attr('href')
            cy.wrap($link).click()
            cy.url().should('include', href)
          })
      })
    cy.get('[data-test="list-name"]').should('be.visible')
  })

  it('can update a list', () => {
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.get('[data-test=edit-list]').click()
      })
    cy.get('[data-test="list-modal"] [data-test="list-name"]')
      .clear()
      .type('my preciouses')
    cy.get('[data-test="list-modal"] [data-test="list-description"]')
      .clear()
      .type('all the stuff i own')
    cy.get('[data-test="list-modal"] [data-test="list-public"]').click()
    cy.get('[data-test="list-modal"] [data-test="list-save-button"]').click()
    cy.wait(1000)
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.contains('a', 'my preciouses')
        cy.contains('span', 'all the stuff i own')
        cy.get('[data-test=public-false]').should('be.visible')
      })
  })

  it.skip('can cancel deleting a list', () => {
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.get('[data-test=delete-list]').click()
      })
    // todo: create confirmation modal
  })

  it('can delete a list', () => {
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.get('[data-test=delete-list]').click()
      })
    // todo: create confirmation modal
    // todo: test that the list is gone
  })
})
