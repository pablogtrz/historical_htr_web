<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span
        >&copy; {{ new Date().getFullYear() }} Pablo Gutiérrez Gomis - TFG
        Ingeniería Multimedia</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Historical HTR',
    }
  },
}
</script>
