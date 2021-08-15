<template>
  <div>
    <canvas
      ref="canvas"
      width="768"
      height="300"
      class="image-preview"
    ></canvas>
    <img ref="image" :src="base64Image" style="display: none" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '@/constants/image'

export default Vue.extend({
  props: {
    value: {
      type: ImageData,
      default: undefined,
    },
    base64Image: {
      type: String,
      required: true,
    },
    invert: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      canvas: {} as HTMLCanvasElement,
      ctx: {} as CanvasRenderingContext2D,
    }
  },
  watch: {
    async base64Image() {
      await this.drawCanvas()
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')!
    this.ctx.filter = this.invert ? 'grayscale(1) invert(100%)' : 'grayscale(1)'
  },
  methods: {
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    async drawCanvas() {
      await Vue.nextTick()
      this.clearCanvas()
      const image = this.$refs.image as HTMLImageElement

      const scale = this.getScaledImage(image)
      this.ctx.scale(scale, scale)

      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(image, 0, 0)
      this.ctx.scale(1 / scale, 1 / scale)

      this.$emit(
        'input',
        this.ctx.getImageData(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT)
      )
    },
    getScaledImage(image: HTMLImageElement) {
      const scale = IMAGE_HEIGHT / image.height
      return scale > 1 ? 1 : scale
    },
  },
})
</script>

<style lang="scss">
.image-preview {
  border: 1px solid rgb(119, 119, 119);
}
</style>
