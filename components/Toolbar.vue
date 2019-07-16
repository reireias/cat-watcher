<template>
  <v-toolbar>
    <v-toolbar-title class="primary--text">
      ねこかん
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon flat color="secondary" @click="subscribe" v-on="on">
          <v-icon>notifications_active</v-icon>
        </v-btn>
      </template>
      <span>通知ON</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon flat color="secondary" @click="signOut" v-on="on">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </template>
      <span>サインアウト</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
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
