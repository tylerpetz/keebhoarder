// programatic login, logs in user, sets localstorage
Cypress.Commands.add(
  'login',
  (email = Cypress.env('email'), password = Cypress.env('password')) => {
    cy.session(email, () => {
      cy.request('POST', '/api/login', {
        email,
        password,
      })
        .its('body')
        .then((res) => {
          window.localStorage.setItem(
            'auth._token.local',
            `Bearer ${res.token}`
          )
          window.localStorage.setItem('auth.strategy', 'local')
        })
    })
  }
)
