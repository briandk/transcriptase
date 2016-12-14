const createVideoPlayer = require('./renderer-process/createVideoPlayer')
const loadTranscript = require('./renderer-process/loadTranscript')
const ipc = require('electron').ipcRenderer
const registerFileSelectionButtons = require('./renderer-process/registerFileSelectionEvent')
let videoContainer = document.getElementById('video-player-container')

let transcriptEditor = require('./renderer-process/initializeQuillEditor')
registerFileSelectionButtons()

ipc.on('a-file-was-selected', (event, filepath, roleOfFile) => {
  if (roleOfFile === 'transcript') {
    loadTranscript(event, filepath, roleOfFile, transcriptEditor)
  } else if (roleOfFile === 'video') {
    createVideoPlayer(videoContainer, filepath)
  }
})

createVideoPlayer(videoContainer)
