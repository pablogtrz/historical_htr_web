<template>
  <div class="main">
    <h1 class="font-title text-center mb-3">Historical HTR</h1>
    <p class="font-body text-center mb-6">
      Herramienta de transcripción de texto en documentos históricos mediante
      inteligencia artificial.
    </p>
    <section class="mb-3">
      <ImageInput v-model="base64Image" />
    </section>
    <section>
      <ImagePreview
        v-model="imageData"
        :base64-image="base64Image"
        :invert="true"
      />
    </section>
    <section>
      <h2 style="margin-top: 20px">sss</h2>
      <canvas
        ref="canvass"
        width="768"
        height="128"
        class="image-preview"
        style="border: 1px solid #000"
      ></canvas>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Tensor3D } from '@tensorflow/tfjs'
import Model from '../services/model'
import { normalizeTensor } from '../services/normalizeTensor'
import { ctcGreedyDecoder } from '../services/ctcGreedyDecoder'
import { getTensorFrom } from '../services/tensorflow'
import ImageInput from './input/ImageInput.vue'
import ImagePreview from './input/ImagePreview.vue'

export default Vue.extend({
  components: {
    ImageInput,
    ImagePreview,
  },
  data() {
    return {
      base64Image: '',
      image: undefined as HTMLImageElement | undefined,
      tensor: undefined,
      imageData: undefined,
    }
  },
  watch: {
    async imageData(n: ImageData) {
      this.drawTempCanvas(n)
      const model = await Model.createFrom('./keras_model/model.json')
      let tensor = await getTensorFrom(n)
      tensor = tensor.mean(2, true).expandDims(0)
      tensor = normalizeTensor(tensor)
      const ctcEncodedPrediction = model.predict(tensor) as Tensor3D
      const prediction = ctcGreedyDecoder(await ctcEncodedPrediction.array())
      console.log(prediction)
    },
  },
  mounted() {
    this.image = this.$refs.image as HTMLImageElement
  },
  methods: {
    drawTempCanvas(n: ImageData) {
      const canvas = this.$refs.canvass as HTMLCanvasElement
      if (canvas) {
        const ctx = canvas.getContext('2d')!
        ctx.putImageData(n, 0, 0)
      }
    },
  },
})
</script>
<style lang="scss">
.main {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  box-sizing: border-box;
  padding: 2rem 3rem;
}
</style>
