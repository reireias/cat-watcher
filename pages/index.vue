<template>
  <v-layout column justify-center align-center>
    <image-list></image-list>

    <v-snackbar v-model="snakebar" top>
      {{ notificationBody }}
      <v-spacer />
      <v-btn icon @click="snakebar = false"
        ><v-icon color="primary">cancel</v-icon></v-btn
      >
    </v-snackbar>
  </v-layout>
</template>

<script>
import firebase from '@/plugins/firebase'
import ImageList from '@/components/ImageList'
export default {
  components: {
    ImageList
  },
  data() {
    return {
      allowed: true,
      snakebar: false,
      notificationBody: null
    }
  },
  mounted() {
    const messaging = firebase.messaging()
    messaging.onMessage(payload => {
      this.notificationBody = payload.notification.body
      this.snakebar = true
    })
  }
}
</script>
