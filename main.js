let {app, Menu, BrowserWindow} = require('electron')
const fs = require('fs-plus')
const ipc = require('electron').ipcMain
const {saveFile} = require('./saveTranscript')
const dialog = require('electron').dialog
const isMacOS = require('./isMacOS')
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
    const dialogBoxWindow = isMacOS ? mainWindow : null
    dialog.showMessageBox(dialogBoxWindow,
      {
        message: 'It looks like you have unsaved changes. What would you like to do?',
        buttons: ['Close Without Saving', 'Continue Editing', 'Save Transcript and Close'],
        defaultId: 1
      },
      (response) => {
        if (response === 0) {
          mainWindow.destroy()
        } else if (response === 1) {
          return false
        } else if (response === 2) {
          mainWindow.webContents.send('user-wants-to-close-the-app')
        }
      }
    )
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
  fs.readFile(
      filePath.toString(),
      'utf-8',
      (err, data) => {
        if (err) console.log(err)
        console.log(data)
        event.sender.send('transcript-was-read-from-file', data, filePath.toString())
      }
    )
})

// file saving
ipc.on('save-transcript', (event, transcriptText, lastSavedPath, doesUserWantToCloseTheApp) => {
  saveFile(event, transcriptText, lastSavedPath, doesUserWantToCloseTheApp)
})

ipc.on('close-the-app', function (event) {
  mainWindow.destroy()
})
