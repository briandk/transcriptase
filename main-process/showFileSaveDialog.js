const BrowserWindow = require('electron').BrowserWindow
const dialog = require('electron').dialog
const isMacOS = require('./../isMacOS')
const saveOptions = {
  title: 'Save an Image',
  properties: ['createDirectory']
}

const showFileSaveDialog = function (event) {
  const window = BrowserWindow.fromWebContents(event.sender)
  let file

  if (isMacOS) {
    dialog.showSaveDialog(window, saveOptions, function (filename) {
      event.sender.send('saved-file', filename)
    })
  } else {
    dialog.showSaveDialog(saveOptions, function (filename) {
      event.sender.send('saved-file', filename)
    })
  }
  return file || null
}

module.exports = showFileSaveDialog
