import { app, BrowserWindow } from "electron"
import path from "path"
import { format as formatUrl } from "url"
import isDevelopment from "electron-is-dev"
import { createMenu } from "./menu"
import { setContentSecurityPolicy } from "../renderer/contentSecurityPolicy"
import { listenForUserInitiatedSave } from "./saveFile"
import { listenForKeyboardShortcutToCloseTheWindow } from "./listenForKeyboardShortcut"
import { rememberToSaveBeforeClosing } from "./saveBeforeClosing"
import { installDevTools } from "./installDevTools"
import { listenForRequestToLoadTranscript } from "./loadFile"
import { listenForScrubVideoToTimecode } from "./listenForScrubbingToASpecifiedTime"
import { listenForTranscriptChanges } from "./listenForTranscriptChanges"
import { isMacOS } from "../common/isMacOS"

export let mainWindow: BrowserWindow = null

// default dimensions

/**
 * Creates the main window.
 *
 * @param appPath The path to the bundle root.
 * @param showDelay How long in ms before showing the window after the renderer is ready.
 * @return The main BrowserWindow.
 */
export async function createMainWindow(): Promise<BrowserWindow> {
  // create our main window
  const window = new BrowserWindow({
    width: 1200,
    height: 900,
    show: false,
    useContentSize: true,
    titleBarStyle: "default",
    autoHideMenuBar: false,
    vibrancy: "light",
    transparent: false,
    title: app.name,
    icon: path.join(__dirname, "app", "assets", "img", "icon512x512.png"),
    webPreferences: {
      allowRunningInsecureContent: true,
      backgroundThrottling: true,
      nodeIntegration: true,
      textAreasAreResizable: false,
      webSecurity: false,
    },
  })

  window.on("closed", (): void => {
    mainWindow = null
  })

  window.webContents.on("devtools-opened", (): void => {
    window.focus()
    setImmediate((): void => {
      window.focus()
    })
  })
  return window
}

function loadPage(window: BrowserWindow): void {
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
}

app.on(
  "activate",
  async (): Promise<BrowserWindow> => {
    if (isMacOS() && mainWindow === null) {
      mainWindow = await createMainWindow()
    }
    return mainWindow
  },
)

// quit application when all windows are closed
app.on("window-all-closed", (): void => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  // if (process.platform !== "darwin") {
  app.quit()
  // }
})

// create main BrowserWindow when electron is ready
app.on(
  "ready",
  async (): Promise<BrowserWindow> => {
    mainWindow = await createMainWindow()
    loadPage(mainWindow)
    createMenu(mainWindow)
    setContentSecurityPolicy()
    installDevTools()
    listenForKeyboardShortcutToCloseTheWindow(mainWindow)
    listenForUserInitiatedSave(mainWindow)
    rememberToSaveBeforeClosing(mainWindow, app)
    listenForRequestToLoadTranscript(mainWindow)
    listenForScrubVideoToTimecode()
    listenForTranscriptChanges()
    mainWindow.on("ready-to-show", () => {
      mainWindow.show()
      mainWindow.focus()
    })
    return mainWindow
  },
)
