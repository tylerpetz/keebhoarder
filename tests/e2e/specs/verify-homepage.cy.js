describe('Homepage', () => {
  it('visits the homepage', () => {
    cy.visit('/')
    cy.contains('h1', 'Keebhoarder')
  })
})
