<template>
  <v-toolbar>
    <v-toolbar-title class="primary--text">
      ねこかん
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="subscribe">
      <v-icon>notifications_active</v-icon>
    </v-btn>
    <v-btn icon @click="signOut">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapActions } from 'vuex'
export default {
  methods: {
    async subscribe() {
      const messaging = firebase.messaging()
      try {
        await messaging.requestPermission()
        const token = await messaging.getToken()
        this.updateUserMessagingToken({
          userId: this.user.uid,
          messagingToken: token
        })
      } catch (err) {
        // TODO
      }
    },
    signOut() {
      firebase.auth().signOut()
    },
    ...mapActions(['updateUserMessagingToken'])
  }
}
</script>

<style>
.v-toolbar__title {
  font-size: 36px;
}
</style>
