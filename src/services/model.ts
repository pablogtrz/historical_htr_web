import * as tf from '@tensorflow/tfjs'

export class Model {
  model: tf.LayersModel
  private constructor(model: tf.LayersModel) {
    this.model = model
  }

  static async createFrom(url: string) {
    const model = await tf.loadLayersModel(url)
    return new Model(model)
  }

  summary() {
    this.model.summary()
  }

  predict(item: any) { // TODO type it well
    return this.model.predict(item)
  }
}

export default Model