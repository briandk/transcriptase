const matchTimestamps = require('./matchTimestamps')

const formatMatchedTimestamps = function (editor) {
  const matches = matchTimestamps(editor.getText())
  matches.map(function (match) {
    editor.formatText(match.index, match.length, { timestamp: true })
  })
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
