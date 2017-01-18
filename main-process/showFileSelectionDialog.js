const BrowserWindow = require('electron').BrowserWindow
const dialog = require('electron').dialog
const isMacOS = require('./../isMacOS')

const showFileSelectionDialog = function (event, roleOfFile) {
  const window = BrowserWindow.fromWebContents(event.sender)
  let file

  if (isMacOS) {
    file = dialog.showOpenDialog(window, { properties: [ 'openFile' ] })
  } else {
    file = dialog.showOpenDialog({ properties: [ 'openFile' ] })
  }
  return file || null
}

module.exports = showFileSelectionDialog
