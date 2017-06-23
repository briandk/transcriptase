const bracketPattern = /\[([^\]]+)\]/g
const inputText = "To [sleep], [per]chance []to [dream]"

let match
let startingIndex
let matchLength

while (match = bracketPattern.exec(inputText)) {
  startingIndex = match.index + 1   // Have to advance past the opening square bracket
  matchLength = bracketPattern.lastIndex - startingIndex - 1  // and remove the closing bracket
  console.log(
    `starting index: ${startingIndex}, matchLength: ${matchLength}
     ${inputText.slice(startingIndex, startingIndex + matchLength)}
     ${match}
    `
  )
}
