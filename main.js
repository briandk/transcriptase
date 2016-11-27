const electron = require('electron')
const app = electron.app // Module to control application life.
const BrowserWindow = electron.BrowserWindow // Module to create native browser window.

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    show: false
  })

  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.openDevTools()   // Open the DevTools.

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => { 
  createWindow();
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


