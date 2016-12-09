const ipc = require('electron').ipcRenderer
const Quill = require('quill')
require('./render-process/registerFileSelectionEvent.js')

const initializeQuillEditor = function () {
  let transcriptEditor = new Quill('#transcript-editor', {
    modules: {
      toolbar: true  // Include button in toolbar
    },
    theme: 'snow'
  })
  return (transcriptEditor)
}

ipc.on('selected-file', handleFileSelection)


