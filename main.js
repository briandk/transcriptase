let { app, BrowserWindow, Menu } = require('electron')
const localShortcut = require('electron-localshortcut')
const fs = require('fs-plus')
const ipc = require('electron').ipcMain
const { saveFile } = require('./saveTranscript')
const { showUnsavedChangesDialog } = require('./closeTheApp')
const menuTemplate = require('./menu/menuTemplate')
const { registerPlayPauseToggleAsGlobalShortcut } = require('./main-process/controlPlayback')
const { registerJumpBackNSeconds } = require('./main-process/controlPlayback')
const electronLocalShortcut = require('electron-localshortcut')

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

  app.on('will-quit', function () {
    localShortcut.unregisterAll(mainWindow)
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
  registerPlayPauseToggleAsGlobalShortcut(mainWindow, electronLocalShortcut.register)
  registerJumpBackNSeconds(mainWindow, electronLocalShortcut.register)

  mainWindow.once('ready-to-show', () => {
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
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

// global shortcuts

// app.on('ready', () => {
//   globalShortcut.register('CmdOrCtrl+;', function () {
//     console.log(`inserting `)
//   })
// })
