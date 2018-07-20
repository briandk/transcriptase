// This is the main process entry point. It is the
// first file that is run on startup.
//
// It is responsible for launching a renderer window.

import { app, dialog, ipcMain } from "electron"
import { createMainWindow, loadURL } from "../main-window"
import * as log from "electron-log"
import * as isDev from "electron-is-dev"
import { createMenu } from "../menu"
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer"
import { setContentSecurityPolicy } from "./contentSecurityPolicy"

const installReactDevTools: () => void = () => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log("An error occurred: ", err))
}

// set proper logging level
log.transports.file.level = isDev ? false : "info"
log.transports.console.level = isDev ? "debug" : false

let window: Electron.BrowserWindow
let showStorybook = false

// usually we'd just use __dirname here, however, the FuseBox
// bundler rewrites that, so we have to get it from Electron.
const appPath = app.getAppPath()

// fires when Electron is ready to start
app.on("ready", () => {
  window = createMainWindow(appPath)
  createMenu(window)
  installReactDevTools()
  setContentSecurityPolicy()

  if (isDev) {
    window.webContents.on("did-fail-load", () => {
      dialog.showErrorBox(
        "Error opening storybook",
        'Storybook failed to open. Please ensure the storybook server is running by executing "npm run storybook"',
      )
    })

    ipcMain.on("storybook-toggle", () => {
      showStorybook = !showStorybook
      loadURL(window, appPath, showStorybook)
    })
  }
})

// fires when all windows are closed
app.on("window-all-closed", app.quit)
