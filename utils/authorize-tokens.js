/*
Extract and validate tokens in the URL if they are present.
*/
import store from '../store'
import router from '../router'

/**
 * Reads the URL hash attempts and tries to detect if there is confirmation tokens from either an email signup or
 * external provider. If present it will call the relevant process to attempt to authorise the token.
 */
function detectTokens() {
  const emailToken = detectEmailConfirmationToken()
  const externalAccessToken = detectExternalAccessToken()
  const recoveryToken = detectRecoveryToken()
  const localStorageTokens = detectLocalStorage()

  if (emailToken) {
    // console.log('Detected email confirmation token', emailToken)
    confirmEmailToken(emailToken)
  } else if (externalAccessToken) {
    // console.log(
    //   'Detected external access token, received object for external login',
    //   externalAccessToken
    // )
    confirmExternalAccessToken(externalAccessToken)
  } else if (recoveryToken) {
    // console.log('found recovery token', recoveryToken)
    confirmRecoveryToken(recoveryToken)
  } else if (localStorageTokens) {
    loadLocalStorageTokens(localStorageTokens)
  }

  // console.log('No tokens detected in URL hash')
}

/**
 * Checks URL hash for `confirmation_token=` then extracts the token which proceeds.
 */
function detectEmailConfirmationToken() {
  try {
    return decodeURIComponent(document.location.search).split(
      'confirmation_token='
    )[1]
  } catch (error) {
    console.error(
      'Something went wrong when trying to extract email confirmation email',
      error
    )
    return null
  }
}

/**
 * Checks URL hash for `access_token` then extracts, cleans and creates a params object which contains the JWT along
 * with other metadata.
 */
function detectExternalAccessToken() {
  try {
    const externalTokenRegex = /access_token=/
    // Clean the URL
    const hash = (document.location.hash || '').replace(/^#\/?/, '')

    if (hash.match(externalTokenRegex)) {
      const params = {}
      // create token param from url hash
      hash.split('&').forEach((pair) => {
        // each pair e.g 'token=f8fjCu9_MX_V5Eoci2iV8g' needs to split again so that we can construct key value pairs.
        const [key, value] = pair.split('=')
        params[key] = value
      })
      return params
    }
  } catch (error) {
    console.error(
      'Something went wrong trying to extract the access token',
      error
    )
    return null
  }
}

/**
 * Checks URL hash for `recovery_token` then extracts the token which proceeds.
 */
function detectRecoveryToken() {
  try {
    return decodeURIComponent(document.location.hash).split(
      'recovery_token='
    )[1]
  } catch (error) {
    console.error(
      'Something went wrong when trying to extract email confirmation email',
      error
    )
    return null
  }
}

/**
 * Checks localStorage for tokens and currentUser object and returns them.
 */
function detectLocalStorage() {
  const tokens = JSON.parse(localStorage.getItem('tokens')) || null
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null
  if (!tokens || !currentUser) return null
  return {
    tokens,
    currentUser,
  }
}

/**
 * @param {string} token - authentication token used to confirm a user who has created an account via email signup.
 */
function confirmEmailToken(token) {
  store
    .dispatch('auth/verifyEmailToken', token)
    .then((resp) => {
      router.push({ name: 'index' })
    })
    .catch((error) => {
      store.commit('auth/AUTH_ERROR', 'tokenValidationError')
      router.push({ name: 'index' })
      console.error(error, 'Somethings gone wrong validating your email token')
    })
}

/**
 * @param {object} externalAccessTokenObject - object which includes the JWT along with metadata such as token type,
 *                                             refresh token, expiry time. only th JWT token is used current, but we
 *                                             send the whole object over just in case the other parts of the object
 *                                             might be useful for other things later.
 */
function confirmExternalAccessToken(externalAccessTokenObject) {
  store
    .dispatch('auth/completeExternalLogin', externalAccessTokenObject)
    .then(() => {
      alert('You have successfully signed in via external provider')
    })
    .catch((error) => {
      alert("Can't Authorise your account right now, try again")
      console.error(error, 'Somethings gone wrong logging in')
    })
}

function confirmRecoveryToken(recoveryToken) {
  store
    .dispatch('auth/attemptPasswordRecovery', recoveryToken)
    .then(() => {
      router.push('profile?showUpdateUserModal=true')
      alert('Account has been recovered. Update your password now.')
    })
    .catch(() => {
      alert("Can't recover password")
    })
}

function loadLocalStorageTokens({ tokens, currentUser }) {
  store.commit('auth/AUTH_SUCCESS', { tokens, currentUser })
}

export default function () {
  detectTokens()
}
