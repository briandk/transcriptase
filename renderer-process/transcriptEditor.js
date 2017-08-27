const Quill = require('quill')
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

const toolbarOptions = [
  [
    { 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [
    'clean']]

let transcriptEditor = new Quill('.transcript-editor', {
  modules: {
    toolbar: '#toolbar'
  },
  theme: 'snow',
  placeholder: 'Transcribe away...'
})

formatTimestampsOnTextChange(transcriptEditor)
registerBlots(customBlots)

module.exports = transcriptEditor
