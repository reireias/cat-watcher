<template>
  <v-layout column justify-center align-center>
    <v-flex xs12>
      <div class="signin-title primary--text">ねこかん</div>
    </v-flex>
    <v-flex xs12>
      <div class="signin-body-text">猫監視システム</div>
    </v-flex>
    <br />
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

<style>
.signin-title {
  font-size: 256px;
}
.signin-body-text {
  font-size: 36px;
}
@media (max-width: 600px) {
  .signin-title {
    font-size: 56px;
  }
  .signin-body-text {
    font-size: 24px;
  }
}
</style>
