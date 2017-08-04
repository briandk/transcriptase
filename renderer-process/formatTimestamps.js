const matchTimestamps = require('./matchTimestamps')
const scrubVideoToTimestamp = require('./scrubVideoToTimestamp')

const formatMatchedTimestamps = function (editor) {
  const matches = matchTimestamps(editor.getText())
  matches.map(function (match) {
    editor.formatText(match.index, match.length, { timestamp: true })
  })
  const timestamps = document.getElementsByClassName('timestamp')

  for (let timestamp of timestamps) {
    timestamp.addEventListener('click', scrubVideoToTimestamp, false)
  }
  // timestamps.map(
  //   function (element) {
  //     element.addEventListener('click', scrubVideoToTimestamp, false)
  //   }
  // )
}

const formatTimestampsOnTextChange = function (editor) {
  editor.on(
    'text-change',
    function (delta, oldDelta, source) {
      if (source === 'user') {
        formatMatchedTimestamps(editor)
      }
    }
  )
}

module.exports = formatTimestampsOnTextChange
