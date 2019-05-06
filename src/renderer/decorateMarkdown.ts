import { Node as SlateNode, Range } from "slate"
import Prism from "prismjs"
import { LanguageDefinition, Token } from "prismjs"
import { timestampPattern } from "./matchTimestamps"

const extendGrammar = (base: LanguageDefinition): LanguageDefinition => {
  const timestampToken = {
    timestamp: {
      pattern: timestampPattern,
    },
  }
  const extendedGrammar = { ...base, ...timestampToken }
  return extendedGrammar
}

export const decorateMarkdown = (node: SlateNode): any => {
  if (node.object != "block") return null

  const string = node.text
  const texts = node.getTexts().toArray()
  const grammar = extendGrammar(Prism.languages.markdown)
  const tokens: (string | Prism.Token)[] = Prism.tokenize(string, grammar)
  const decorations = []
  let startText = texts.shift()
  let endText = startText
  let startOffset = 0
  let endOffset = 0
  let start = 0

  function getLength(token: any): number {
    if (typeof token == "string") {
      return token.length
    } else if (typeof token.content == "string") {
      return token.content.length
    } else {
      return token.content.reduce((l: number, t: Token): number => {
        return l + getLength(t)
      }, 0)
    }
  }

  for (const token of tokens) {
    startText = endText
    startOffset = endOffset

    const length = getLength(token)
    const end = start + length

    let available = startText.text.length - startOffset
    let remaining = length

    endOffset = startOffset + remaining

    while (available < remaining) {
      endText = texts.shift()
      remaining = length - available
      available = endText.text.length
      endOffset = remaining
    }

    if (typeof token != "string") {
      const dec = {
        anchor: {
          key: startText.key,
          offset: startOffset,
        },
        focus: {
          key: endText.key,
          offset: endOffset,
        },
        mark: {
          type: token.type,
        },
      }

      decorations.push(dec)
    }

    start = end
  }

  return decorations
}
