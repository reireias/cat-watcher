<template>
  <v-app>
    <toolbar></toolbar>
    <v-content>
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
