import { app, BrowserWindow } from "electron"
import path from "path"
import { format as formatUrl } from "url"
import { createMenu } from "./menu"
import { setContentSecurityPolicy } from "../renderer/contentSecurityPolicy"
import { listenForWhenTheEditorChanges, listenForUserInitiatedSave } from "./saveFile"

import { listenForKeyboardShortcutToCloseTheWindow } from "./listenForKeyboardShortcut"
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer"
import { rememberToSaveBeforeClosing } from "./saveBeforeClosing"

const isDevelopment = process.env.NODE_ENV !== "production"
const installDevTools: (isDev: boolean) => void = (isDev: boolean) => {
  const tools: any[] = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]
  if (isDev) {
    require("devtron").install()
  }

  tools.map(devTool =>
    installExtension(devTool)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log("An error occurred: ", err)),
  )

  installExtension(REDUX_DEVTOOLS)
}

let mainWindow: BrowserWindow = null

// default dimensions

/**
 * Creates the main window.
 *
 * @param appPath The path to the bundle root.
 * @param showDelay How long in ms before showing the window after the renderer is ready.
 * @return The main BrowserWindow.
 */
export function createMainWindow() {
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
      webSecurity: false,
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
  // if (process.platform !== "darwin") {
  app.quit()
  // }
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
  setContentSecurityPolicy()
  listenForWhenTheEditorChanges()
  listenForKeyboardShortcutToCloseTheWindow(mainWindow)
  listenForUserInitiatedSave(mainWindow)
  installDevTools(isDevelopment)
  rememberToSaveBeforeClosing(mainWindow, app)
  mainWindow.show()
})

// app.on("before-quit", () => alert("are you ok with being a quitter?"))
