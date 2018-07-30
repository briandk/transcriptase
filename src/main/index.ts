import { app, BrowserWindow, Event as ElectronEvent } from "electron"
import path from "path"
import { format as formatUrl } from "url"
import { createMenu } from "./menu"
import { setContentSecurityPolicy } from "../renderer/contentSecurityPolicy"
import { editorIsDirty, listenForWhenTheEditorIsDirty, registerSaveHandler } from "./saveFile"
import { saveBeforeClosing } from "./saveBeforeClosing"
import { listenForKeyboardShortcutToCloseTheWindow } from "./listenForKeyboardShortcut"

const isDevelopment = process.env.NODE_ENV !== "production"
let mainWindow: BrowserWindow = null

// default dimensions
export const DIMENSIONS = { width: 1000, height: 800, minWidth: 450, minHeight: 450 }

/**
 * Creates the main window.
 *
 * @param appPath The path to the bundle root.
 * @param showDelay How long in ms before showing the window after the renderer is ready.
 * @return The main BrowserWindow.
 */
export function createMainWindow() {
  console.log("creating main window!")

  // create our main window
  const window = new BrowserWindow({
    width: 1200,
    height: 900,
    show: false,
    useContentSize: true,
    titleBarStyle: "default",
    autoHideMenuBar: false,
    // backgroundColor: '#fff',
    vibrancy: "light",
    transparent: false,
    title: app.getName(),
    webPreferences: {
      allowRunningInsecureContent: true,
      backgroundThrottling: true,
      nodeIntegration: true,
      textAreasAreResizable: false,
      webSecurity: true,
    },
  })
  if (isDevelopment) {
    window.webContents.openDevTools()
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      }),
    )
  }

  window.on("closed", () => {
    mainWindow = null
  })

  window.webContents.on("devtools-opened", () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })
  console.log("window is ", window)
  return window
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow()
  createMenu(mainWindow)
  // isDevelopment ? installDevTools() : null
  setContentSecurityPolicy()
  registerSaveHandler(mainWindow)
  listenForWhenTheEditorIsDirty()
  mainWindow.addListener("close", (event: ElectronEvent) => {
    if (editorIsDirty()) {
      event.preventDefault()
      saveBeforeClosing(mainWindow)
    }
  })
  listenForKeyboardShortcutToCloseTheWindow(mainWindow)
  mainWindow.show()
})
