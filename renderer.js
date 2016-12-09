const ipc = require('electron').ipcRenderer
const handleFileSelection = require('./renderer-process/handleFileSelection')

let transcriptEditor = require('./renderer-process/initializeQuillEditor')
ipc.on(
  'selected-file',
  (event, file, roleOfFile) => handleFileSelection(event, file, roleOfFile, transcriptEditor)
)

require('./renderer-process/registerFileSelectionEvent')
