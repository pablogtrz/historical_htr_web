import {
  CHARACTERS,
  CTC_CHARACTER,
  TRANSCRIPTIONS,
} from '@/constants/characters'

export type CTCEncodedArray = number[][][]
export type CTCInstant = {
  value: number
  accuracy: number
}
export type CTCTranscriptedInstant = {
  value: string
  accuracy: number
}

export function ctcGreedyDecoder(encoded: CTCEncodedArray) {
  const posteriorgram = encoded[0]
  const indexes = [] as CTCInstant[]

  for (let i = 0; i < posteriorgram.length; i++) {
    const instant = posteriorgram[i]
    const maxValue = Math.max(...instant)
    const index = instant.indexOf(maxValue)
    indexes.push({ value: index, accuracy: maxValue })
  }

  const letters = toLetters(indexes)
  const compressedOutput = compressOutput(letters)

  return {
    text: setSpecialCharacters(compressedOutput.word),
    values: compressedOutput.accuracies,
  }
}

export default ctcGreedyDecoder

function compressOutput(instants: CTCTranscriptedInstant[]) {
  const compressedWord = [] as string[]
  const compressedAccuracies = [] as number[]

  let lastInstant = {} as CTCTranscriptedInstant
  instants.forEach((instant) => {
    const letter = instant.value
    if (letter && letter !== lastInstant.value && letter !== CTC_CHARACTER) {
      compressedWord.push(letter)
      compressedAccuracies.push(instant.accuracy)
    }
    lastInstant = instant
  })
  return { word: compressedWord, accuracies: compressedAccuracies }
}

function toLetters(instants: CTCInstant[]): CTCTranscriptedInstant[] {
  return instants.map((instant) => {
    return {
      accuracy: parseFloat(instant.accuracy.toFixed(2)),
      value: CHARACTERS[instant.value],
    }
  })
}

function setSpecialCharacters(letters: string[]) {
  return letters
    .map((letter) => {
      return Object.keys(TRANSCRIPTIONS).includes(letter)
        ? (TRANSCRIPTIONS as Record<string, string>)[letter]
        : letter
    })
    .join('')
}
