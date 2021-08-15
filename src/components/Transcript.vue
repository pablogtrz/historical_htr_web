<template>
  <div class="transcript">
    <v-btn v-if="base64Image" color="primary" text @click="reset">
      <v-icon class="mr-1">mdi-restart</v-icon>
      Elegir otra imagen
    </v-btn>

    <section v-if="!base64Image" class="mb-5 transcript__input">
      <h3>1. Selecciona una imagen</h3>
      <p class="font-body mb-6">
        Selecciona una imagen de prueba o sube una de tus archivos.
      </p>
      <ImageInputWrapper v-model="base64Image" />
    </section>
    <ImagePreview
      v-model="imageData"
      hidden
      :base64-image="base64Image"
      :invert="true"
    />

    <section v-if="base64Image" class="mb-5">
      <h3>Previsualización</h3>
      <img :src="base64Image" class="transcript__preview" alt="Image Preview" />
      <v-btn
        color="secondary"
        :disabled="!base64Image"
        class="d-block mx-auto mb-3"
        @click="predict"
        >Transcribir</v-btn
      >
      <v-divider></v-divider>
    </section>

    <section v-if="base64Image" class="mb-5 transcript__prediction">
      <v-progress-circular
        v-if="loading"
        color="secondary"
        indeterminate
      ></v-progress-circular>
      <div v-else>
        <h3>Predicción</h3>
        <h1 class="font-title transcript__prediction--result">
          {{ prediction }}
        </h1>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ImageInputWrapper from 'components/input/ImageInputWrapper.vue'
import ImagePreview from 'components/input/ImagePreview.vue'
import Model from '@/services/model'
import { normalizeTensor } from '@/services/normalizeTensor'
import { ctcGreedyDecoder } from '@/services/ctcGreedyDecoder'
import { getTensorFrom } from '@/services/tensorflow'
import { Tensor3D } from '@tensorflow/tfjs'

export default Vue.extend({
  components: {
    ImageInputWrapper,
    ImagePreview,
  },
  data() {
    return {
      base64Image: '',
      loading: false,
      image: undefined as HTMLImageElement | undefined,
      tensor: undefined,
      imageData: undefined as ImageData | undefined,
      prediction: '',
    }
  },
  mounted() {
    this.image = this.$refs.image as HTMLImageElement
  },
  methods: {
    async predict() {
      this.loading = true
      const model = await Model.createFrom('/keras_model/model.json')
      const tensor = await this.getTensorFromImageData(this.imageData!)
      const ctcEncodedPrediction = model.predict(tensor) as Tensor3D
      const prediction = ctcGreedyDecoder(await ctcEncodedPrediction.array())
      this.prediction = prediction
      this.loading = false
    },
    async getTensorFromImageData(imageData: ImageData) {
      let tensor = await getTensorFrom(imageData)
      tensor = tensor.mean(2, true).expandDims(0)
      tensor = normalizeTensor(tensor)
      return tensor
    },
    reset() {
      this.base64Image = ''
      this.imageData = undefined
      this.prediction = ''
    },
  },
})
</script>

<style lang="scss">
.transcript {
  margin: 0 auto;
  text-align: center;
  padding: 1rem 3rem;

  &__prediction {
    display: block;
  }

  &__preview {
    max-width: -webkit-fill-available;
  }
}
</style>
