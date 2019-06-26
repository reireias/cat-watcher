<template>
  <v-app>
    <toolbar></toolbar>
    <v-content class="bg-body">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar'
export default {
  components: {
    Toolbar
  }
}
</script>

<style>
.bg-body {
  background-image: url('/bg.png');
  background-repeat: repeat;
}
</style>
