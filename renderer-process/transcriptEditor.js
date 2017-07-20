const Quill = require('quill')
const Delta = require('quill-delta')
const { findAndMatchTimestampsOnTextChange } = require('./matchTimestamps')
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

registerBlots(customBlots)

let delta1 = new Delta()
delta1.insert('hello, world!\n', { timestamp: false })

let transcriptEditor = new Quill('.transcript-editor', {
  modules: {
    toolbar: true // Include button in toolbar
  },
  theme: 'snow',
  placeholder: 'Transcribe away...'
})

findAndMatchTimestampsOnTextChange(transcriptEditor)
transcriptEditor.setContents(delta1)

module.exports = transcriptEditor
