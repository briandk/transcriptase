const matchTimestamps = function (inputText) {
  const lengthOfDelimiter = 1 // Have to advance past/before the opening/closing brackets
  let bracketPattern = /\[(\d{1,2}[:.]){1,3}\d{2}\]/g
  let match = bracketPattern.exec(inputText)
  let matches = []
  let startingIndex
  let matchLength

  while (match !== null) {
    startingIndex = (match.index + lengthOfDelimiter)
    matchLength = (bracketPattern.lastIndex - startingIndex - lengthOfDelimiter)
    matches = matches.concat({
      index: startingIndex,
      length: matchLength
    })
    match = bracketPattern.exec(inputText)
  }
  return (matches)
}

module.exports = matchTimestamps
