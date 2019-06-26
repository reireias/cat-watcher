<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap>
      <v-flex v-for="image in images" :key="image.id" xs6 sm4 md3>
        <v-card class="image-card" hover>
          <v-img
            class="image-card-image"
            :src="image.url"
            max-width="275px"
            max-height="200px"
            contain
            @click="onImageClick(image)"
          >
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
              <v-icon>close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" max-width="50%">
      <v-card v-if="currentImage">
        <v-img :src="currentImage.url"></v-img>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import firebase from '@/plugins/firebase'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      dialog: false,
      currentImage: null
    }
  },
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
    onDeleteImage(image) {
      const storageRef = firebase.storage().ref()
      const imageRef = storageRef.child(`${image.name}`)
      imageRef.delete().then(() => {
        this.deleteImage({
          id: image.id
        })
      })
    },
    onImageClick(image) {
      this.dialog = true
      this.currentImage = image
    },
    ...mapActions(['bindImages', 'deleteImage'])
  }
}
</script>

<style>
.image-card {
  text-align: -webkit-center;
  padding: 0px;
}
</style>
