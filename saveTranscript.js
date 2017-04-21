const ipc = require('electron').ipcRenderer
const dialog = require('electron').dialog
const fs = require('fs-plus')
const isMacOS = require('./isMacOS')
const saveOptions = {
  title: 'Save Your Transcript',
  properties: ['createDirectory'],
  filters: [
     { name: 'text', extensions: ['txt'] } // sets default file extension
  ]
}
const Delta = require('quill-delta')
let isTranscriptEditorDirty = true // eslint-disable-line no-unused-vars

module.exports = {

  registerSaveHandlers (transcriptEditor, saveHandler, saveAsHandler) {
    const saveButton = document.querySelector('.save-transcript')
    const saveAsButton = document.querySelector('.save-transcript-as')

    saveButton.addEventListener('click', () => {
      saveHandler(transcriptEditor)
    })
    saveAsButton.addEventListener('click', () => {
      saveAsHandler(transcriptEditor)
    })
  },

  handleASaveClick (transcriptEditor) {
    ipc.send(
      'save-transcript',
      transcriptEditor.getText(),
      document.querySelector('.editor-container').getAttribute('data-last-saved-path'),
      false
    )
  },

  handleASaveAsClick (transcriptEditor) {
    ipc.send(
      'save-transcript',
      transcriptEditor.getText(),
      null,
      false
    )
  },

  saveFile (
    event,
    transcriptText,
    lastSavedPath,
    appWindow,
    quitAfterSaving = false
    ) {
    const window = isMacOS() ? appWindow : null
    let savePath = lastSavedPath || dialog.showSaveDialog(window, saveOptions)

    if (savePath) {
      fs.writeFile(savePath, transcriptText, (err) => {
        if (err) {
          throw err
        } else {
          appWindow.webContents.send('saved-file', savePath)
          if (quitAfterSaving) {
            appWindow.destroy()
          }
        }
      })
    }
  },

  autosave (transcriptEditor) {
    let change = new Delta()
    const autosaveInterval = 3 * 1000 // milliseconds
    const saveIfDocumentHasChanged = function () {
      let lastSavedPath = document.querySelector('.editor-container').getAttribute('data-last-saved-path')
      if (change.length() > 0 && lastSavedPath) {
        ipc.send(
          'save-transcript',
          transcriptEditor.getText(),
          lastSavedPath
        )
        change = new Delta()
      }
    }
    transcriptEditor.on('text-change', (delta) => {
      change = change.compose(delta)
    })
    setInterval(saveIfDocumentHasChanged, autosaveInterval)
  },

  setIsEditorDirty (truthValue) {
    isTranscriptEditorDirty = truthValue
  },

  isEditorDirty () {
    return (isTranscriptEditorDirty)
  }
}

//
// TO save the transcript
//   wire up the "Save" button
//   save the file
//   update the last-saved path
//
// TO wire up the "Save button"
//   select the save button element
//   register `handle a save click` on the element
//

// ------
// TO save the file
//   receive a renderer message containing:
//     - the text of the transcript
//     - the value of the last path the user saved to (might be null or empty string)
//   IF there's no last saved path
//     show a dialog box to let the user select the path
//   write the file to disk
//   send a message to RENDERER containing:
//     - the path written to
//
// TO update the last-saved-path
//   receive a message containing:
//     - the path written to
//   select the editor container element
//   set the data-last-saved-path attribute
//
// TO handle a save click
//   send a message to MAIN containing:
//     - the text of the transcript
//     - the value (if it exists) of the last path the user saved to
//
