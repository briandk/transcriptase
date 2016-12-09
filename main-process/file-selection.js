const BrowserWindow = require('electron').BrowserWindow
const dialog = require('electron').dialog
const ipc = require('electron').ipcMain
const isMacOS = (process.platform === 'darwin')

const showFileSelectionDialog = function (event, roleOfFile) {
  const window = BrowserWindow.fromWebContents(event.sender)
  let file

  if (isMacOS) {
    file = dialog.showOpenDialog(window, { properties: [ 'openFile' ] })
  } else {
    file = dialog.showOpenDialog({ properties: [ 'openFile' ] })
  }
  if (file) event.sender.send('selected-file', file, roleOfFile)
}

ipc.on('open-file-dialog', function (event, roleOfFile) {
  showFileSelectionDialog(event, roleOfFile)
})
