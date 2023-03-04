// https://docs.cypress.io/api/introduction/api.html

describe('Item functionality', () => {
  beforeEach(() => {
    cy.login()
    cy.intercept('GET', '/api/items*').as('getItems')
    cy.visit('/items')
    cy.wait('@getItems')
  })

  it('can navigate to items', () => {
    cy.visit('/')
    cy.contains('header nav a', 'Items').click()
    cy.url().should('include', '/items')
    cy.contains('h3', 'Items')
  })

  it('can create an item', () => {
    cy.contains('button', 'Create New Item').click()
    cy.get('[data-test="item-modal"] [data-test="item-name"]').type('tofu60')
    cy.get('[data-test="item-modal"] [data-test="item-description"]').type(
      'all the keeb i need'
    )
    cy.get('[data-test="item-modal"] [data-test="item-public"]').click()
    cy.get('[data-test="item-modal"] [data-test="item-save-button"]').click()
    cy.wait(1000)
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.contains('a', 'tofu60')
        cy.contains('span', 'all the keeb i need')
        cy.get('[data-test=public-true]').should('be.visible')
      })
  })

  it('can view an item', () => {
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
    cy.get('[data-test="item-name"]').should('be.visible')
  })

  it('can update an item', () => {
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.get('[data-test=edit-item]').click()
      })
    cy.get('[data-test="item-modal"] [data-test="item-name"]')
      .clear()
      .type('moontower 60')
    cy.get('[data-test="item-modal"] [data-test="item-description"]')
      .clear()
      .type('holy grail')
    cy.get('[data-test="item-modal"] [data-test="item-public"]').click()
    cy.get('[data-test="item-modal"] [data-test="item-save-button"]').click()
    cy.wait(1000)
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.contains('a', 'moontower 60')
        cy.contains('span', 'holy grail')
        cy.get('[data-test=public-false]').should('be.visible')
      })
  })

  it.skip('can cancel deleting an item', () => {
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.get('[data-test=delete-item]').click()
      })
    // todo: create confirmation modal
  })

  it('can delete an item', () => {
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.get('[data-test=delete-item]').click()
      })
    // todo: create confirmation modal
    // todo: test that the item is gone
  })
})
