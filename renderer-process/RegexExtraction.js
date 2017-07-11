const bracketPattern = /\[([^\]]+)\]/g
const inputText = 'To [sleep], [per]chance [to] [dream]'

const matchTimestampText = function (inputText) {
  const lengthOfDelimiter = 1 // Have to advance past/before the opening/closing brackets
  let match
  let startingIndex
  let matchLength

  while (match = bracketPattern.exec(inputText)) {
    startingIndex = (match.index + lengthOfDelimiter)
    matchLength = (bracketPattern.lastIndex - startingIndex - lengthOfDelimiter)
    console.log(
      `starting index: ${startingIndex}, matchLength: ${matchLength}
       ${inputText.slice(startingIndex, startingIndex + matchLength)}
       ${match}
      `
    )
  }
}

const recursivelyMatchTimestamps =
  function (pattern, inputText, finalIndexOfLastMatch, operations) {
    const match = pattern.exec(inputText)
    if (match === null) {
      console.log(operations)
      return (
        operations.concat(
          { retain: inputText.slice(finalIndexOfLastMatch).length }
      ))
    } else {
      const lengthOfDelimiter = 1
      const matchLength = pattern.lastIndex - match.index
      const timestampLength = matchLength - (2 * lengthOfDelimiter)

      recursivelyMatchTimestamps(
        pattern,
        inputText,
        pattern.lastIndex,
        operations.concat([
          { retain: match.index + lengthOfDelimiter },
          { retain: timestampLength, attributes: { link: true } },
          { retain: lengthOfDelimiter }
        ])
      )
    }
  }

recursivelyMatchTimestamps(
  bracketPattern,
  inputText,
  0,
  []
)
