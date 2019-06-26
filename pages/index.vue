<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">TODO</div>
      <v-btn @click="subscribe">subscribe</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['user'])
  },
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
    ...mapActions(['updateUserMessagingToken'])
  }
}
</script>
