<template>
  <v-app dark>
    <v-app-bar app elevate-on-scroll>
      <img
        src="@/assets/img/HTRLogo.png"
        alt="App logo"
        width="50px"
        class="mr-4 app-bar-item"
        @click="$router.push('/')"
      />
      <h3 class="app-bar-title app-bar-item" @click="$router.push('/')">
        {{ title }}
      </h3>
      <DesktopNavbar v-if="isDesktop" />
      <v-btn v-else text class="ma-0 ml-auto" @click="drawer = true">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <div class="container">
          <Nuxt />
        </div>
      </v-container>
    </v-main>
    <v-footer app fixed>
      <span>&copy; {{ new Date().getFullYear() }} Pablo Gutiérrez Gomis</span>
    </v-footer>
    <MobileNavbar v-if="!isDesktop" v-model="drawer" />
  </v-app>
</template>

<script>
import Vue from 'vue'
import DesktopNavbar from 'components/navbar/DesktopNavbar.vue'
import MobileNavbar from 'components/navbar/MobileNavbar.vue'

export default Vue.extend({
  components: { DesktopNavbar, MobileNavbar },
  data() {
    return {
      title: 'HTR Washington',
      drawer: false,
    }
  },
  computed: {
    isDesktop() {
      return this.$vuetify.breakpoint.mdAndUp
    },
  },
})
</script>

<style lang="scss" scoped>
.app-bar-item {
  cursor: pointer;

  &:hover {
    opacity: 0.75;
    transition: 0.3s;
  }
}

.app-bar-title {
  font-family: RobotoSlab !important;
}
</style>
