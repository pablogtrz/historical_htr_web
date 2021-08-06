import * as tf from '@tensorflow/tfjs'

export async function getTensorFrom(
  image:
    | tf.PixelData
    | ImageData
    | HTMLImageElement
    | HTMLCanvasElement
    | HTMLVideoElement
    | ImageBitmap
) {
  return await tf.browser.fromPixelsAsync(image)
}
