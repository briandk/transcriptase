const createVideoPlayer = require('./renderer-process/createVideoPlayer')
const ipc = require('electron').ipcRenderer
const registerFileSelectionButtons = require('./renderer-process/registerFileSelectionEvent')
let transcriptEditor = require('./renderer-process/initializeQuillEditor')()
let videoContainer = document.getElementById('video-player-container')
registerFileSelectionButtons(transcriptEditor)

ipc.on('a-file-was-selected', (event, filepath, roleOfFile) => {
  if (roleOfFile === 'transcript') {
    ipc.send('read-transcript-from-filepath', filepath)
  } else if (roleOfFile === 'video') {
    createVideoPlayer(videoContainer, filepath)
  }
})

ipc.on('transcript-was-read-from-file', (event, fileContents) => {
  console.log(fileContents)
  transcriptEditor.setText(fileContents)
})

createVideoPlayer(videoContainer) // create the first (blank) instance of the video player

