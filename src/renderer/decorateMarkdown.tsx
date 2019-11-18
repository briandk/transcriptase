import Prism from "prismjs"
import { timestampPattern } from "./matchTimestamps"

const extendGrammar = (base: any): any => {
  const timestampToken = {
    timestamp: {
      pattern: timestampPattern,
    },
  }
  const extendedGrammar = { ...base, ...timestampToken }
  return extendedGrammar
}

export const decorateNode = (node: any, editor: any, next: any) => {
  const others = next() || []
  if (node.object !== "block") return others

  const string = node.text
  const texts = Array.from(node.texts())
  const grammar = extendGrammar(Prism.languages.markdown)
  const tokens = Prism.tokenize(string, grammar)
  const decorations = []
  let startEntry: any = texts.shift()
  let endEntry = startEntry
  let startOffset = 0
  let endOffset = 0
  let start = 0

  function getLength(token: any): number {
    if (typeof token === "string") {
      return token.length
    } else if (typeof token.content === "string") {
      return token.content.length
    } else {
      return token.content.reduce((l: number, t: any) => l + getLength(t), 0)
    }
  }

  for (const token of tokens) {
    startEntry = endEntry
    startOffset = endOffset

    const [startText, startPath] = startEntry
    const length = getLength(token)
    const end = start + length

    let available = startText.text.length - startOffset
    let remaining = length

    endOffset = startOffset + remaining

    while (available < remaining) {
      endEntry = texts.shift()
      const [endText] = endEntry
      remaining = length - available
      available = endText.text.length
      endOffset = remaining
    }

    const [endText, endPath] = endEntry

    if (typeof token !== "string") {
      const dec = {
        type: token.type,
        anchor: {
          key: startText.key,
          path: startPath,
          offset: startOffset,
        },
        focus: {
          key: endText.key,
          path: endPath,
          offset: endOffset,
        },
      }

      decorations.push(dec)
    }

    start = end
  }
  console.log(decorations)
  return [...others, ...decorations]
}
