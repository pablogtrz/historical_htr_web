<template>
  <div class="container landing-page">
    <v-row justify="center" align="center" class="pt-md-15">
      <v-col cols="12" md="6" order-md="1">
        <img
          src="~/assets/img/technology_illustration.png"
          class="landing-page__image"
          alt="Home page illustration"
        />
      </v-col>

      <v-col cols="0" md="6">
        <h1 class="text-xl-h2 font-title mb-3 text-center text-md-left">
          HTR Washington Dataset
        </h1>
        <p class="font-body mb-6">
          Herramienta de transcripción de texto en documentos históricos
          mediante inteligencia artificial. Entrenada y preparada para funcionar
          con el dataset
          <a href="https://fki.tic.heia-fr.ch/databases/washington-database"
            >IAM-HistDB - Washington Database
          </a>
        </p>

        <div class="landing-page__buttons text-center text-md-left">
          <nuxt-link to="/transcript">
            <v-btn
              elevation="0"
              large
              color="primary"
              class="mr-md-5 mx-2 mx-md-0 my-2 mb-my-0"
            >
              ¡Quiero probarlo!
            </v-btn>
          </nuxt-link>

          <v-btn large color="primary" text @click="$router.push('/info')"
            >Cómo funciona</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss">
.landing-page {
  &__image {
    width: inherit;
  }

  a {
    text-decoration: none;
    font-weight: 600;
  }
}
</style>
