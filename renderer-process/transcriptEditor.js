const Quill = require('quill')
const Delta = require('quill-delta')
const formatTimestampsOnTextChange = require('./formatTimestamps')
const customBlots = ['Timestamp']

const registerBlots = function (blotNames) {
  blotNames.map(
    function (blotName) {
      const blotPath = `./../blots/${blotName}`
      const blot = require(blotPath)
      Quill.register(blot)
    }
  )
}

let transcriptEditor = new Quill('.transcript-editor', {
  modules: {
    toolbar: true // Include button in toolbar
  },
  theme: 'snow',
  placeholder: 'Transcribe away...'
})

formatTimestampsOnTextChange(transcriptEditor)
registerBlots(customBlots)

module.exports = transcriptEditor
