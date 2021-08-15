<template>
  <div class="info-page">
    <h2 class="font-title mb-2">Cómo funciona</h2>
    <p>
      Esta web app consiste en la implementación de una inteligencia artificial
      para la transcripción de texto en imágenes. A partir de una imagen dada,
      se devolverá el texto detectado en ésta.
    </p>
    <p>
      El proyecto es parte del Trabajo Final de Grado para Ingeniería Multimedia
      <span class="caption">
        Reconocimiento de texto manuscrito en documentos históricos
      </span>
    </p>

    <h2 class="font-title mb-2">Qué imágenes transcribe</h2>
    <p>
      La IA ha sido entrenada con el dataset
      <strong>
        <a
          href="https://fki.tic.heia-fr.ch/databases/washington-database"
          target="_blank"
        >
          Washington Dataset</a
        >
      </strong>
      perteneciente a la base de datos de
      <strong>
        <a href="https://diuf.unifr.ch/main/hisdoc/iam-histdb" target="_blank">
          IAM-HistDB
        </a></strong
      >.
    </p>
    <p>
      Este dataset se creó a partir de documentos manuscritos de George
      Washington, primer presidente de los Estados Unidos, en el siglo XVIII.
      Contiene imágenes binarizadas (blanco y negro, sin grises), con una altura
      de 120 píxeles como la siguiente:
    </p>
    <img
      src="@/assets/img/dataset_examples/orders.png"
      alt="orders dataset image"
    />
    <p class="mb-6">
      A la hora de introducir una imagen, se debería utilizar las imágenes del
      dataset que podemos descargar desde la web enlazada más arriba. En caso de
      no disponer en el dispositivo de ninguna de ellas, se da la opción de
      utilizar 3 imágenes de ejemplo.
    </p>

    <v-btn color="primary" @click="$router.push('/transcript')">
      Transcribir una imagen
    </v-btn>
  </div>
</template>

<style lang="scss">
.info-page {
  max-width: 1200px;
}
</style>
