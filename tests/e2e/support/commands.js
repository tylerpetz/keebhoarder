// programatic login, logs in user, sets localstorage
Cypress.Commands.add(
  'login',
  function (email = Cypress.env('email'), password = Cypress.env('password')) {
    cy.request('POST', '/api/login', {
      email,
      password,
    })
      .its('body')
      .then((res) => {
        window.localStorage.setItem('auth._token.local', `Bearer ${res.token}`)
        window.localStorage.setItem('auth.strategy', 'local')
      })
    cy.visit('/')
  }
)

Cypress.Commands.add('register', (username, email, password) => {
  cy.session(email, () => {
    cy.request('POST', '/api/register', {
      name: username,
      email,
      password,
    })
  })
  cy.visit('/')
})

Cypress.Commands.add(
  'createList',
  (name = 'test', description = 'test list') => {
    cy.contains('button', 'Create New List').click()
    cy.get('[data-test="list-modal"] [data-test="list-name"]').type(name)
    cy.get('[data-test="list-modal"] [data-test="list-description"]').type(
      description
    )
    cy.get('[data-test="list-modal"] [data-test="list-public"]').click()
    cy.get('[data-test="list-modal"] [data-test="list-save-button"]').click()
    cy.wait(1000)
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.contains('a', name)
        cy.contains('span', description)
        cy.get('[data-test=public-true]').should('be.visible')
      })
  }
)

Cypress.Commands.add(
  'createItem',
  (name = 'test', description = 'test item') => {
    cy.contains('button', 'Create New Item').click()
    cy.get('[data-test="item-modal"] [data-test="item-name"]').type(name)
    cy.get('[data-test="item-modal"] [data-test="item-description"]').type(
      description
    )
    cy.get('[data-test="item-modal"] [data-test="item-public"]').click()
    cy.get('[data-test="item-modal"] [data-test="item-save-button"]').click()
    cy.wait(1000)
    cy.get('#vgt-table tbody tr')
      .first()
      .within(() => {
        cy.contains('a', name)
        cy.contains('span', description)
        cy.get('[data-test=public-true]').should('be.visible')
      })
  }
)

Cypress.Commands.add('clearUser', () => {
  cy.request({
    method: 'GET',
    url: '/api/clear/user',
    headers: {
      authorization: window.localStorage.getItem('auth._token.local'),
    },
  })
})

Cypress.Commands.add('clearLists', () => {
  cy.request({
    method: 'GET',
    url: '/api/clear/lists',
    headers: {
      authorization: window.localStorage.getItem('auth._token.local'),
    },
  })
})

Cypress.Commands.add('clearItems', () => {
  cy.request({
    method: 'GET',
    url: '/api/clear/items',
    headers: {
      authorization: window.localStorage.getItem('auth._token.local'),
    },
  })
})

Cypress.Commands.add('visitItems', () => {
  cy.intercept('GET', '/api/items*').as('getItems')
  cy.visit('/items')
  cy.wait('@getItems')
})

Cypress.Commands.add('visitLists', () => {
  cy.intercept('GET', '/api/lists*').as('getLists')
  cy.visit('/lists')
  cy.wait('@getLists')
})
