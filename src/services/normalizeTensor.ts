import type { Rank, Tensor } from '@tensorflow/tfjs'
import { buffer } from '@tensorflow/tfjs'
import { IMAGE_WIDTH } from '@/constants/image'

export function normalizeTensor(tensor: Tensor<Rank.R3>): Tensor<Rank.R3> {
  const bufferedTensor = buffer(tensor.shape, tensor.dtype, tensor.dataSync())
  tensor.dataSync().forEach((value: number, index: number) => {
    if (value === 255) {
      bufferedTensor.set(
        1,
        0,
        Math.trunc(index / IMAGE_WIDTH),
        index % IMAGE_WIDTH,
        0
      )
    }
  })
  return bufferedTensor.toTensor() as Tensor<Rank.R3>
}
