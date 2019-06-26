<template>
  <v-container grid-list-xs fluid>
    <v-layout row wrap>
      <v-flex v-for="image in images" :key="image.id" xs6 sm4 md3>
        <v-card class="image-card">
          <v-img :src="image.url" width="200px" height="200px" contain>
            <template v-slot:placeholder>
              <v-layout fill-height align-center justify-center ma-0>
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-layout>
            </template>
          </v-img>
          <v-card-actions>
            {{ formatDate(image.createdAt) }}
            <v-spacer />
            <v-btn icon @click="onDeleteImage(image)">
              <v-icon>cancel</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['images'])
  },
  created() {
    this.bindImages()
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp.seconds * 1000)
      const year = date.getFullYear()
      const month = `0${date.getMonth() + 1}`.slice(-2)
      const day = `0${date.getDate()}`.slice(-2)
      const hour = `0${date.getHours()}`.slice(-2)
      const min = `0${date.getMinutes()}`.slice(-2)
      const sec = `0${date.getSeconds()}`.slice(-2)
      return `${year}/${month}/${day} ${hour}:${min}:${sec}`
    },
    onDleteImage(image) {
      const storageRef = firebase.storage().ref()
      const imageRef = storageRef.child(`images/${image.filename}`)
      imageRef.delete().then(() => {
        this.deleteImage({
          id: image.id
        })
      })
    },
    ...mapActions(['bindImages', 'deleteImage'])
  }
}
</script>

<style>
.image-card {
  text-align: -webkit-center;
  padding: 0px 5px;
}
</style>
