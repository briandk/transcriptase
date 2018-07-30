// This is the main process entry point. It is the
// first file that is run on startup.
//
// It is responsible for launching a renderer window.

import { app, Event as ElectronEvent, dialog, ipcMain } from "electron"
import { createMainWindow, loadURL } from "../main"
import * as log from "electron-log"
import * as isDev from "electron-is-dev"
import { createMenu } from "../menu"
// import installExtension, {
//   REACT_DEVELOPER_TOOLS,
//   REDUX_DEVTOOLS,
// } from "electron-devtools-installer"
import { setContentSecurityPolicy } from "./contentSecurityPolicy"
import { registerSaveHandler, listenForWhenTheEditorIsDirty, editorIsDirty } from "../main/saveFile"
import { saveBeforeClosing } from "../main/saveBeforeClosing"
import { listenForKeyboardShortcutToCloseTheWindow } from "../main/listenForKeyboardShortcut"

// const installDevTools = () => {
//   const tools: any[] = [REACT_DEVELOPER_TOOLS]
//   require("devtron").install()
//   tools.map(devTool =>
//     installExtension(devTool)
//       .then(name => console.log(`Added Extension:  ${name}`))
//       .catch(err => console.log("An error occurred: ", err)),
//   )

//   installExtension(REDUX_DEVTOOLS)
// }

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
  // isDev ? installDevTools() : null
  setContentSecurityPolicy()
  registerSaveHandler(window)
  listenForWhenTheEditorIsDirty()
  window.addListener("close", (event: ElectronEvent) => {
    if (editorIsDirty()) {
      event.preventDefault()
      saveBeforeClosing(window)
    }
  })
  listenForKeyboardShortcutToCloseTheWindow(window)
  // window.on("close", (event: ElectronEvent) => {
  //   console.log("editorIsDirty is", editorIsDirty)
  //   if (editorIsDirty()) {
  //     // event.preventDefault()
  //     saveBeforeClosing(window)
  //   }
  // })

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
