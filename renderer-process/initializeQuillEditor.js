const Quill = require('quill')

const initializeQuillEditor = function () {
  let transcriptEditor = new Quill('.transcript-editor', {
    modules: {
      toolbar: true  // Include button in toolbar
    },
    theme: 'snow',
    placeholder: 'Transcribe away...'
  })
  return (transcriptEditor)
}

module.exports = initializeQuillEditor()
