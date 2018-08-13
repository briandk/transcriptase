import { Node as SlateNode } from "slate"
import Prism from "prismjs"

export const decorateMarkdown = (node: SlateNode) => {
  if (node.object != "block") return null

  const string = node.text
  const texts = node.getTexts().toArray()
  const grammar = Prism.languages.markdown
  const tokens = Prism.tokenize(string, grammar)
  const decorations = []
  let startText = texts.shift()
  let endText = startText
  let startOffset = 0
  let endOffset = 0
  let start = 0

  function getLength(token: any) {
    if (typeof token == "string") {
      return token.length
    } else if (typeof token.content == "string") {
      return token.content.length
    } else {
      return token.content.reduce((l: any, t: any) => l + getLength(t), 0)
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
      const range = {
        anchor: {
          key: startText.key,
          offset: startOffset,
        },
        focus: {
          key: endText.key,
          offset: endOffset,
        },
        marks: [
          {
            type: token.type,
          },
        ],
      }

      decorations.push(range)
    }

    start = end
  }

  return decorations
}
