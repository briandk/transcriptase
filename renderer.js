const ipc = require('electron').ipcRenderer
const registerFileSelectionButtons = require('./renderer-process/registerFileSelectionEvent')

let transcriptEditor = require('./renderer-process/initializeQuillEditor')
ipc.on(
  'selected-file',
  (event, file, roleOfFile) => handleFileSelection(event, file, roleOfFile, transcriptEditor)
)
registerFileSelectionButtons()

require('./renderer-process/registerFileSelectionEvent')
