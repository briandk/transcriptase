let {app, BrowserWindow} = require('electron')
const fs = require('fs-plus')
const ipc = require('electron').ipcMain
const {saveFile} = require('./saveTranscript')
const {showUnsavedChangesDialog} = require('./closeTheApp')
require('./menu/menuTemplate')

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    frame: true,
    title: 'Transcriptase'
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)
  // mainWindow.webContents.openDevTools()   // Open the DevTools.

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.on('close', (event) => {
    event.preventDefault()
    mainWindow.webContents.send('user-wants-to-close-the-app')
  })
}

app.on('ready', () => {
  createWindow()
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
})

app.on('window-all-closed', function () {
  app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

// File selection
const showFileSelectionDialog = require('./main-process/showFileSelectionDialog')
ipc.on('open-file-dialog', function (event, roleOfFile) {
  let file = showFileSelectionDialog(event, roleOfFile)
  if (file) {
    event.sender.send('a-file-was-selected', file.toString(), roleOfFile)
  }
})

ipc.on('read-transcript-from-filepath', (event, filePath) => {
  let transcriptStream = fs.createReadStream(
    filePath.toString(), { encoding: 'utf-8' }
  )
  let data = ''

  transcriptStream.on('data', (chunk) => { data += chunk })
  transcriptStream.on('end', () => {
    event.sender.send('transcript-was-read-from-file', data, filePath.toString())
  })

  // fs.readFile(
  //   filePath.toString(),
  //   'utf-8',
  //   (err, data) => {
  //     if (err) console.log(err)
  //     console.log(data)
  //     event.sender.send('transcript-was-read-from-file', data, filePath.toString())
  //   }
  // )
})

// file saving
ipc.on('save-transcript', (event, transcriptText, lastSavedPath) => {
  saveFile(event, transcriptText, lastSavedPath, mainWindow)
})

ipc.on('show-unsaved-changes-dialog', (event, transcriptEditor, lastSavedPath) => {
  showUnsavedChangesDialog(event, mainWindow, transcriptEditor, lastSavedPath)
})

ipc.on('its-safe-to-close-the-app', (event) => {
  mainWindow.destroy()
})
