import firebase from '@/plugins/firebase'

export default ({ route, store, redirect }) => {
  const auth = firebase.auth()
  auth.onAuthStateChanged(user => {
    if (user) {
      store.dispatch('setUser', user)
    } else {
      store.dispatch('unsetUser')
      if (route.name !== 'signin') {
        redirect('/signin')
      }
    }
  })
}
