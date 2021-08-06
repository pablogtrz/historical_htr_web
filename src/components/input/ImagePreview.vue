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

export default Vue.extend({
  props: {
    value: {
      type: ImageData,
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
  async mounted() {
    this.canvas = this.$refs.canvas as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')!
    this.ctx.filter = this.invert ? 'grayscale(1) invert(100%)' : 'grayscale(1)'
    await this.drawCanvas()
  },
  methods: {
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    async drawCanvas() {
      await Vue.nextTick()
      this.clearCanvas()
      const image = this.$refs.image as HTMLImageElement
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(image, 0, 0)
      const width = image.width > 768 ? image.width : 768
      // TODO resize to height of image
      this.$emit('input', this.ctx.getImageData(0, 0, width, 128))
    },
    // invertCanvas() {
    //   // TODO: check if necessary
    //   const imageData = this.ctx.getImageData(
    //     0,
    //     0,
    //     this.ctx.canvas.width,
    //     this.ctx.canvas.height
    //   )
    //   const pixels = imageData.data

    //   for (let i = 0; i < pixels.length; i += 4) {
    //     const lightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3

    //     pixels[i] = lightness
    //     pixels[i + 1] = lightness
    //     pixels[i + 2] = lightness
    //   }
    //   this.ctx.putImageData(imageData, 0, 0)
    // },
  },
})
</script>

<style lang="scss">
.image-preview {
  border: 1px solid rgb(119, 119, 119);
}
</style>
