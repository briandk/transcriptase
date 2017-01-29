const createVideoPlayer = require('./renderer-process/createVideoPlayer')
const ipc = require('electron').ipcRenderer
const registerFileSelectionButtons = require('./renderer-process/registerFileSelectionEvent')
let videoContainer = document.getElementById('video-player-container')
const {
  autosave,
  registerSaveHandlers,
  handleASaveClick,
  handleASaveAsClick
} = require('./saveTranscript')
let editorContainer = document.querySelector('.editor-container')
const lastSavedPath = 'data-last-saved-path'
let transcriptEditor = require('./renderer-process/transcriptEditor')

registerFileSelectionButtons(transcriptEditor)
registerSaveHandlers(transcriptEditor, handleASaveClick, handleASaveAsClick)
autosave(transcriptEditor)

ipc.on('a-file-was-selected', (event, filepath, roleOfFile) => {
  if (roleOfFile === 'transcript') {
    ipc.send('read-transcript-from-filepath', filepath)
  } else if (roleOfFile === 'video') {
    createVideoPlayer(videoContainer, filepath)
  }
})

ipc.on('transcript-was-read-from-file', (event, fileContents, filePath) => {
  transcriptEditor.setText(fileContents)
  editorContainer.setAttribute(lastSavedPath, filePath)
})

ipc.on('user-wants-to-close-the-app', (event) => {
  ipc.send(
    'save-transcript',
    transcriptEditor.getText(),
    editorContainer.getAttribute(lastSavedPath),
    true
  )
})

ipc.on('saved-file', (event, savePath, doesUserWantToCloseTheApp) => {
  editorContainer.setAttribute(lastSavedPath, savePath)
  ipc.send('editor-is-now-clean')
  if (doesUserWantToCloseTheApp) {
    ipc.send('close-the-app')
  }
})

createVideoPlayer(videoContainer) // create the first (blank) instance of the video player
