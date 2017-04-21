const Quill = require('quill')

let transcriptEditor = new Quill('.transcript-editor', {
  modules: {
    toolbar: true  // Include button in toolbar
  },
  theme: 'snow',
  placeholder: 'Transcribe away...'
})

module.exports = transcriptEditor
