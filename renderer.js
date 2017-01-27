const createVideoPlayer = require('./renderer-process/createVideoPlayer')
const ipc = require('electron').ipcRenderer
const registerFileSelectionButtons = require('./renderer-process/registerFileSelectionEvent')
let videoContainer = document.getElementById('video-player-container')
const {
  registerSaveHandlers,
  handleASaveClick,
  handleASaveAsClick
} = require('./saveTranscript')
let editorContainer = document.querySelector('.editor-container')
const lastSavedPath = 'data-last-saved-path'
let transcriptEditor = require('./renderer-process/transcriptEditor')

registerFileSelectionButtons(transcriptEditor)
registerSaveHandlers(transcriptEditor, handleASaveClick, handleASaveAsClick)

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

ipc.on('saved-file', (event, savePath) => {
  editorContainer.setAttribute(lastSavedPath, savePath)
})

createVideoPlayer(videoContainer) // create the first (blank) instance of the video player
