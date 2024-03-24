export default function ({ redirect, $auth, app, $showMessage }) {
  if (!$auth.loggedIn) {
    // $showMessage({
    //   title: 'Oops...',
    //   text: 'You must be logged in to view this page.',
    //   type: 'error',
    // })
    redirect('/')
  }
}
