const ipc = require('electron').ipcRenderer
const BrowserWindow = require('electron').BrowserWindow
const dialog = require('electron').dialog
const fs = require('fs-plus')
const isMacOS = require('./isMacOS')
const saveOptions = {
  title: 'Save an Image',
  properties: ['createDirectory']
}
const lastSavedPath = 'data-last-saved-path'

module.exports = {
  registerClickHandlers (clickHandler) {
    const saveEventTypes = ['click', 'keydown']
    const saveButton = document.querySelector('.save-transcript')
    saveEventTypes.forEach((eventType) => {
      saveButton.addEventListener(eventType, clickHandler)
    })
  },

  handleASaveClick (transcriptEditor) {
    ipc.send(
      'save-transcript',
      transcriptEditor.getText(),
      document.querySelector('.editor-container').getAttribute(lastSavedPath)
    )
  },

  saveFile (event, transcriptText, lastSavedPath) {
    const window = isMacOS() ? BrowserWindow.fromWebContents(event.sender) : null
    const savePath = lastSavedPath || dialog.showSaveDialog(window, saveOptions)

    if (savePath) {
      fs.writeFile(savePath, transcriptText, (err) => {
        if (err) { throw err }
        console.log(savePath)
        event.sender.send('saved-file', savePath)
      })
    }
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
