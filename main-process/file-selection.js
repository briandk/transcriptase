const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, function (files) {
    console.log('selecting files...')
    if (files) event.sender.send('selected-directory', files)
  })
})
