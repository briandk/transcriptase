import { Node as SlateNode, Range } from "slate"

export interface Match {
  index: number // where the timestamp starts
  length: number // how long it is
  match: RegExpExecArray // the actual content of what was matched
}

const createRange = Range.create as any
const timestampPattern = /\[(\d+|:|\.)+/g
const lengthOfBracket = 1

// returns an array of type Match[]
export const matchTimestamps = (inputText: string, pattern: RegExp = timestampPattern): Match[] => {
  let currentMatch = pattern.exec(inputText)
  let match: Match
  let matches: Match[] = []
  let startingIndex = 0
  let matchLength

  while (currentMatch !== null) {
    startingIndex = currentMatch.index - lengthOfBracket
    matchLength = pattern.lastIndex - startingIndex + lengthOfBracket
    match = {
      index: startingIndex,
      length: matchLength,
      match: currentMatch,
    }
    matches.push(match)
    currentMatch = pattern.exec(inputText)
  }
  console.log("matches are", matches)
  return matches
}

// Is supposed to(?) return an array of deocrations (which are `Range`s?)
export const decorateTimestamps = (node: any) => {
  // console.log("This is ", this);
  console.log("text is ", node.text)

  const decorations: any = []
  const texts = node.getTexts()
  texts.forEach((textNode: SlateNode) => {
    const { key, text } = textNode
    const timestamps = matchTimestamps(text)

    timestamps.forEach((m: Match) => {
      if (m !== undefined) {
        console.log("match is ", m)
        const decoration = createRange({
          anchor: {
            key: key,
            offset: m.index,
          },
          focus: {
            key: key,
            offset: m.index + m.length,
          },
          marks: [{ type: "timestamp" }],
          isAtomic: false,
        })
        decorations.push(decoration)
      }
    })
  })
  // console.log("parts are ", parts
  console.log("decorations are", decorations)

  return decorations
}
