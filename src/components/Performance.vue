<template>
  <div class="performance">
    <section>
      <h3 class="mb-2">Selecciona un backend</h3>
      <p>
        Se ejecutará la transcripción de una imagen utilizando el backend
        seleccionado y mostrando el tiempo que ha tardado el cálculo
      </p>
      <v-radio-group
        v-model="selectedBackend"
        class="performance__radio-buttons"
      >
        <v-radio label="WebGL" :value="0"></v-radio>
        <v-radio label="CPU" :value="1"></v-radio>
      </v-radio-group>
      <v-btn
        color="secondary"
        :disabled="!base64Image"
        class="d-block mx-auto mb-3"
        @click="predict"
        >Transcribir</v-btn
      >
    </section>

    <section v-if="base64Image" class="mb-5 transcript__prediction">
      <v-progress-circular
        v-if="loading"
        color="secondary"
        indeterminate
      ></v-progress-circular>
      <div v-else-if="predictedText">
        <h3 class="mb-2">Tiempo</h3>
        <h1 class="font-title transcript__prediction--result mb-5">
          {{ performance }} s
        </h1>
      </div>

      <div hidden>
        <img
          ref="image"
          src="@/assets/img/dataset_examples/orders.png"
          class="transcript__preview mb-2"
          alt="Image Preview"
        />
        <canvas ref="canvas" width="206" height="120"></canvas>
        <ImagePreview
          v-model="imageData"
          :base64-image="base64Image"
          :invert="true"
        />
      </div>
    </section>

    <v-snackbar v-model="snackbar" color="error">
      Ha ocurrido un error inesperado
      <template #action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ImagePreview from 'components/input/ImagePreview.vue'
import Model from '@/services/model'
import { normalizeTensor } from '@/services/normalizeTensor'
import { ctcGreedyDecoder } from '@/services/ctcGreedyDecoder'
import { getTensorFrom } from '@/services/tensorflow'
import { Tensor3D } from '@tensorflow/tfjs'
import * as tfjs from '@tensorflow/tfjs'

export default Vue.extend({
  components: {
    ImagePreview,
  },
  data() {
    return {
      base64Image: '',
      snackbar: false,
      loading: false,
      image: undefined as HTMLImageElement | undefined,
      tensor: undefined,
      imageData: undefined as ImageData | undefined,
      predictedText: '',
      predictedValues: [] as number[],
      selectedBackend: 0,
      performance: '0.00',
    }
  },
  watch: {
    selectedBackend(newBackend: number) {
      const backend = newBackend === 0 ? 'webgl' : 'cpu'
      tfjs.setBackend(backend)
    },
  },
  mounted() {
    this.image = this.$refs.image as HTMLImageElement
    this.base64Image = this.toBase64(this.image)
    tfjs.setBackend('webgl')
  },
  methods: {
    toBase64(img: HTMLImageElement): string {
      const canvas = this.$refs.canvas as HTMLCanvasElement
      const ctx = canvas.getContext('2d')
      ctx!.drawImage(img, 0, 0)
      return canvas.toDataURL('image/png')
    },
    async predict() {
      this.loading = true
      try {
        const t1 = performance.now()
        const model = await Model.createFrom('/keras_model/model.json')
        const tensor = await this.getTensorFromImageData(this.imageData!)
        const ctcEncodedPrediction = model.predict(tensor) as Tensor3D
        const prediction = ctcGreedyDecoder(await ctcEncodedPrediction.array())
        this.predictedText = prediction.text
        this.predictedValues = prediction.values
        const t2 = performance.now()
        this.performance = ((t2 - t1) / 1000).toFixed(2)
      } catch (error) {
        this.snackbar = true
      }
      this.loading = false
    },
    async getTensorFromImageData(imageData: ImageData) {
      let tensor = await getTensorFrom(imageData)
      tensor = tensor.mean(2, true).expandDims(0)
      tensor = normalizeTensor(tensor)
      return tensor
    },
  },
})
</script>

<style lang="scss">
.performance {
  margin: 0 auto;
  text-align: center;
  padding: 0.5rem 1.75rem;

  &__prediction {
    display: block;
  }

  &__radio-buttons {
    width: fit-content;
    margin: 0 auto;
  }
}
</style>
