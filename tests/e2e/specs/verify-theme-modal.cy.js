import { themes } from '../../../utils/themes'

describe('Theme modal - homepage', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-test=welcome-swap-keycaps]').click()
  })

  it('swap caps modal opens', () => {
    cy.get('[data-test=theme-modal]').should('be.visible')
  })

  it('all themes work correctly', () => {
    cy.wrap(themes).each((theme, i) => {
      cy.contains('span', theme.name).click()
      cy.get('body').should('have.class', `theme-${theme.id}`)
    })
  })

  it('swap caps modal closes', () => {
    cy.contains('[data-test=theme-modal] button', 'Esc').click()
    cy.get('[data-test=theme-modal]').should('not.exist')
  })

  it('bg click closes theme modal', () => {
    cy.get('[data-test=theme-modal]').should('be.visible')
    cy.get('[data-test=theme-modal] [data-test=modal-bg]').click({
      force: true,
    })
    cy.get('[data-test=theme-modal]').should('not.exist')
  })
})
