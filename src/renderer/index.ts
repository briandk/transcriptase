const createVideoPlayer = require('./renderer-process/createVideoPlayer')
const ipc = require('electron').ipcRenderer
const registerFileSelectionButtons = require('./renderer-process/registerFileSelectionEvent')
const { listenForInsertCurrentTimestampEvents } = require('./renderer-process/insertCurrentTime')
const { registerClickHandlerForTimestampButton } = require('./renderer-process/insertCurrentTime')
const { handlePlayPauseToggle } = require('./main-process/controlPlayback')
const { handleJumpingBackNSeconds } = require('./main-process/controlPlayback')

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
const { handleAnyUnsavedChanges } = require('../common/closeTheApp')
let transcriptEditor = require('./renderer-process/transcriptEditor')
let videoPlayer = createVideoPlayer()

registerFileSelectionButtons(transcriptEditor)
registerSaveHandlers(transcriptEditor, handleASaveClick, handleASaveAsClick)
autosave(transcriptEditor)
listenForInsertCurrentTimestampEvents()
registerClickHandlerForTimestampButton()
handlePlayPauseToggle(videoPlayer)
handleJumpingBackNSeconds(videoPlayer)

ipc.on('a-file-was-selected', (event, filepath, roleOfFile) => {
  if (roleOfFile === 'transcript') {
    ipc.send('read-transcript-from-filepath', filepath)
  } else if (roleOfFile === 'video') {
    videoPlayer.src(filepath)
  }
})

ipc.on('transcript-was-read-from-file', (event, fileContents, filePath) => {
  transcriptEditor.setText(fileContents, 'user')
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

setInterval(
  3 * 1000
)
