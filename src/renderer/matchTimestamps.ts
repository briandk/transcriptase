import { Node as SlateNode, Range } from "slate"
const { Point } = require("slate")

export interface Match {
  index: number // where the timestamp starts
  length: number // how long it is
  match: RegExpExecArray // the actual content of what was matched
}

const myRange: any = Range

// returns an array of type Match[]
export const matchTimestamps = (inputText: string, pattern: RegExp = /\[(\d|:|.+)]/g): Match[] => {
  let currentMatch = pattern.exec(inputText)
  let match: Match
  let matches: Match[] = []
  let startingIndex = 0
  let matchLength

  while (currentMatch !== null) {
    startingIndex = currentMatch.index
    matchLength = pattern.lastIndex - startingIndex
    match = {
      index: startingIndex,
      length: matchLength,
      match: currentMatch,
    }
    matches.push(match)
    currentMatch = pattern.exec(inputText)
  }

  return matches
}

// Is supposed to(?) return an array of deocrations (which are `Range`s?)
export const decorateTimestamps = (node: any) => {
  // console.log("This is ", this);
  console.log("text is ", node.text)

  const decorations: any = []
  const texts = node.getTexts()
  texts.forEach((textNode: any) => {
    const { key, text, path } = textNode
    const timestamps = matchTimestamps(text)

    text.forEach((s: string) => {
      const timestamps = matchTimestamps(s)
      if (timestamps.length > 0) {
        timestamps.forEach((m: Match) => {
          console.log("match is ", m)
          // const start = Point.create({
          //   key: key,
          //   path: path,
          //   offset: m.index,
          // })
          // const end = Point.create({
          //   key: key,
          //   path: path,
          //   offset: m.index + m.length,
          // })
          // const decoration: any = myRange.create({
          //   start: start,
          //   end: end,
          //   marks: [{ type: "timestamp" }],
          //   isAtomic: true,
          // })
          const start = Point.create()
            .setKey(key)
            .setOffset(m.index)
          const end = Point.create()
            .setKey(key)
            .setOffset(m.index + m.length)

          const decoration: any = myRange
            .create()
            .setAnchor(start)
            .setFocus(end)
          decorations.push(decoration)
        })
      }
    })
  })
  // console.log("parts are ", parts
  console.log("decorations are", decorations)

  return decorations
}
