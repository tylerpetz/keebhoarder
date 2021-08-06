// programatic login, logs in user, sets localstorage
Cypress.Commands.add('login', (email, password) => {
  let loginResponse
  cy.request('POST', 'http://localhost:3000/v1/auth/login', {
    email: Cypress.env('email'),
    password: Cypress.env('password'),
  })
    .its('body')
    .then((res) => {
      loginResponse = res
    })

  cy.visit('/', {
    onBeforeLoad(win) {
      // and before the page finishes loading
      // set the user object in local storage
      win.localStorage.setItem(
        'currentUser',
        JSON.stringify(loginResponse.user)
      )
      win.localStorage.setItem('tokens', JSON.stringify(loginResponse.tokens))
    },
  })
})
