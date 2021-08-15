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
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'HTR Washington',
    }
  },
}
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
