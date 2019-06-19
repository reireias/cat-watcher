<template>
  <v-layout column justify-center align-center>
    <v-flex xs12>
      <h1>Cat Watcher</h1>
    </v-flex>
    <v-flex xs12>
      <div id="firebase-auth-container"></div>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from '@/plugins/firebase'
import firebaseui from 'firebaseui'
export default {
  layout: 'signin',
  mounted() {
    const auth = firebase.auth()
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
    const config = {
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      signInSuccessUrl: '/'
    }
    ui.start('#firebase-auth-container', config)
  }
}
</script>
