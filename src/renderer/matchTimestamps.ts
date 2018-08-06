interface Match {
  index: number
  length: number
}

export const matchTimestamps = (inputText: string): Match[] => {
  const lengthOfDelimiter = 1 // Have to advance past/before the opening/closing brackets
  let bracketPattern = /\[(\d|:|.)+\]/g
  let match = bracketPattern.exec(inputText)
  let matches: Match[] = []
  let startingIndex
  let matchLength

  while (match !== null) {
    startingIndex = match.index + lengthOfDelimiter
    matchLength = bracketPattern.lastIndex - startingIndex - lengthOfDelimiter
    matches = matches.concat({
      index: startingIndex,
      length: matchLength,
    })
    match = bracketPattern.exec(inputText)
  }
  return matches
}
