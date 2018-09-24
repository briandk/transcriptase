export interface Match {
  index: number // where the timestamp starts
  length: number // how long it is
  match: RegExpExecArray // the actual content of what was matched
}

interface MyMark {
  type: string
}

interface MyPoint {
  key: string
  offset: number
}

export interface MyDecoration {
  anchor: MyPoint
  focus: MyPoint
  mark: MyMark
}

export const timestampPattern = /\[(\d+|:|\.)+\]/g

// returns an array of type Match[]
export const matchTimestamps = (inputText: string, pattern: RegExp = timestampPattern): Match[] => {
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
  const decorations: MyDecoration[] = []
  const texts = node.getTexts()
  texts.forEach((textNode: any) => {
    const { key, text } = textNode
    const timestamps = matchTimestamps(text)

    timestamps.forEach((m: Match) => {
      if (m !== undefined) {
        const decoration: MyDecoration = {
          anchor: {
            key: key,
            offset: m.index,
          },
          focus: {
            key: key,
            offset: m.index + m.length,
          },
          mark: { type: "timestamp" },
        }
        decorations.push(decoration)
      }
    })
  })

  return decorations
}
