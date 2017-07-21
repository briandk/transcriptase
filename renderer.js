const { createVideoPlayer, setVideoSource } = require('./renderer-process/createVideoPlayer')
const ipc = require('electron').ipcRenderer
const registerFileSelectionButtons = require('./renderer-process/registerFileSelectionEvent')
const videojs = require('video.js')
let videoContainer = document.getElementById('video-container')
let videoSource = document.getElementById('video-source')

const {
  autosave,
  registerSaveHandlers,
  handleASaveClick,
  handleASaveAsClick,
  isEditorDirty,
  setIsEditorDirty
} = require('./saveTranscript')
let editorContainer = document.querySelector('.editor-container')
const lastSavedPath = 'data-last-saved-path'
const {handleAnyUnsavedChanges} = require('./closeTheApp')
let transcriptEditor = require('./renderer-process/transcriptEditor')

registerFileSelectionButtons(transcriptEditor)
registerSaveHandlers(transcriptEditor, handleASaveClick, handleASaveAsClick)
autosave(transcriptEditor)

ipc.on('a-file-was-selected', (event, filepath, roleOfFile) => {
  if (roleOfFile === 'transcript') {
    ipc.send('read-transcript-from-filepath', filepath)
  } else if (roleOfFile === 'video') {
    setVideoSource(videoSource, filepath)
  }
})

ipc.on('transcript-was-read-from-file', (event, fileContents, filePath) => {
  transcriptEditor.setText(fileContents)
  editorContainer.setAttribute(lastSavedPath, filePath)
  setIsEditorDirty(false)
})

ipc.on('user-wants-to-close-the-app', (event) => {
  handleAnyUnsavedChanges(
    isEditorDirty(),
    transcriptEditor,
    editorContainer,
    editorContainer.getAttribute(lastSavedPath)
  )
})

ipc.on('saved-file', (event, savePath) => {
  editorContainer.setAttribute(lastSavedPath, savePath)
  setIsEditorDirty(false)
})

// create the first (blank) instance of the video player
createVideoPlayer('video-player')

setInterval(
  () => { console.log(isEditorDirty()) },
  3 * 1000
)
