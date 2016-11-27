const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
const BrowserWindow = require('electron').BrowserWindow

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, function (files) {
    console.log('selecting files...')
    if (files) event.sender.send('selected-directory', files)
  })
})

ipc.on('open-file-dialog-sheet', function (event) {
  const window = BrowserWindow.fromWebContents(event.sender)
  const files = dialog.showOpenDialog(window, { properties: [ 'openFile' ]})
})




