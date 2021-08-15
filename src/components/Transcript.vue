<template>
  <div class="transcript">
    <v-btn v-if="base64Image" color="primary" class="mb-3" text @click="reset">
      <v-icon class="mr-1">mdi-restart</v-icon>
      Elegir otra imagen
    </v-btn>

    <section v-if="!base64Image" class="mb-5 transcript__input">
      <h3 class="mb-2">Selecciona una imagen</h3>
      <ImageInputWrapper v-model="base64Image" />
    </section>
    <ImagePreview
      v-model="imageData"
      hidden
      :base64-image="base64Image"
      :invert="true"
    />

    <section v-if="base64Image" class="mb-5">
      <h3 class="mb-2">Previsualización</h3>
      <img
        :src="base64Image"
        class="transcript__preview mb-2"
        alt="Image Preview"
      />
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
      <div v-else-if="predictedText">
        <h3 class="mb-2">Predicción</h3>
        <h1 class="font-title transcript__prediction--result mb-5">
          {{ predictedText }}
        </h1>
        <PredictionChart
          v-if="predictedText"
          :text="predictedText"
          :values="predictedValues"
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
import ImageInputWrapper from 'components/input/ImageInputWrapper.vue'
import ImagePreview from 'components/input/ImagePreview.vue'
import PredictionChart from 'components/chart/PredictionChart.vue'
import Model from '@/services/model'
import { normalizeTensor } from '@/services/normalizeTensor'
import { ctcGreedyDecoder } from '@/services/ctcGreedyDecoder'
import { getTensorFrom } from '@/services/tensorflow'
import { Tensor3D } from '@tensorflow/tfjs'

export default Vue.extend({
  components: {
    ImageInputWrapper,
    ImagePreview,
    PredictionChart,
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
    }
  },
  mounted() {
    this.image = this.$refs.image as HTMLImageElement
  },
  methods: {
    async predict() {
      this.loading = true
      try {
        const model = await Model.createFrom('/keras_model/model.json')
        const tensor = await this.getTensorFromImageData(this.imageData!)
        const ctcEncodedPrediction = model.predict(tensor) as Tensor3D
        const prediction = ctcGreedyDecoder(await ctcEncodedPrediction.array())
        this.predictedText = prediction.text
        this.predictedValues = prediction.values
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
    reset() {
      this.base64Image = ''
      this.imageData = undefined
      this.predictedText = ''
      this.predictedValues = []
    },
  },
})
</script>

<style lang="scss">
.transcript {
  margin: 0 auto;
  text-align: center;
  padding: 0.5rem 1.75rem;

  &__prediction {
    display: block;
  }

  &__preview {
    max-width: -webkit-fill-available;
    border: 1px solid var(--v-secondary-base);
  }
}
</style>
