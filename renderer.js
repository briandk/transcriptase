const createVideoPlayer = require('./renderer-process/createVideoPlayer')
const loadTranscript = require('./renderer-process/loadTranscript')
const ipc = require('electron').ipcRenderer
const registerFileSelectionButtons = require('./renderer-process/registerFileSelectionEvent')

let transcriptEditor = require('./renderer-process/initializeQuillEditor')
registerFileSelectionButtons()

ipc.on('a-file-was-selected', (event, filepath, roleOfFile) => {
  if (roleOfFile === 'transcript') {
    loadTranscript(event, filepath, roleOfFile, transcriptEditor)
  }
})

// createVideoPlayer('video-player_html5_api')

