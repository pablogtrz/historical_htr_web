import {
  CHARACTERS,
  CTC_CHARACTER,
  TRANSCRIPTIONS,
} from '@/constants/characters'

export type CTCEncodedArray = number[][][]

export function ctcGreedyDecoder(encoded: CTCEncodedArray) {
  const posteriorgram = encoded[0]
  const indexes = []

  for (let i = 0; i < posteriorgram.length; i++) {
    const instant = posteriorgram[i]
    const maxValue = Math.max(...instant)
    indexes.push(instant.indexOf(maxValue))
  }

  const letters = toLetters(indexes)
  const compressedOutput = compressOutput(letters)
  return transcriptOutput(compressedOutput)
}

export default ctcGreedyDecoder

function compressOutput(letters: string[]) {
  const compressedWord = [] as string[]
  let lastLetter = ''
  letters.forEach((letter) => {
    if (letter && letter !== lastLetter && letter !== CTC_CHARACTER) {
      compressedWord.push(letter)
    }
    lastLetter = letter
  })
  return compressedWord
}

function toLetters(values: number[]) {
  return values.map((val) => CHARACTERS[val])
}

function transcriptOutput(letters: string[]) {
  return letters
    .map((letter) => {
      return Object.keys(TRANSCRIPTIONS).includes(letter)
        ? (TRANSCRIPTIONS as Record<string, string>)[letter]
        : letter
    })
    .join('')
}
