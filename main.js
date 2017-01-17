const electron = require('electron')
const app = electron.app // Module to control application life.
const BrowserWindow = electron.BrowserWindow // Module to create native browser window.
const fs = require('fs-plus')
const nativeImage = require('electron').nativeImage
const ipc = require('electron').ipcMain
const showFileSelectionDialog = require('./main-process/showFileSelectionDialog')
const loadTranscript = require('./main-process/loadTranscript')

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    icon: nativeImage.createFromPath('assets/windows-app-icon/icon_768x768-windows.png'),
    show: false,
    frame: true
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)
  // mainWindow.webContents.openDevTools()   // Open the DevTools.

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

// File selection
ipc.on('open-file-dialog', function (event, roleOfFile) {
  let file = showFileSelectionDialog(event, roleOfFile)
  if (file) {
    event.sender.send('a-file-was-selected', file.toString(), roleOfFile)
  }
})

ipc.on('read-transcript-from-filepath', (event, filePath) => {
  fs.readFile(
      filePath.toString(),
      'utf-8',
      (err, data) => {
        if (err) console.log(err)
        console.log(data)
        event.sender.send('transcript-was-read-from-file', data)
      }
    )
})

