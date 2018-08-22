import { App, BrowserWindow, dialog, Event as ElectronEvent } from "electron"
import { saveTranscript } from "./saveFile"
import { getAppState, setAppState } from "../common/appState"

export const rememberToSaveBeforeClosing = (window: BrowserWindow, app: App) => {
  window.on("close", (event: ElectronEvent) => {
    setAppState("userWantsToQuit", true)
    event.preventDefault()
    dialog.showMessageBox(
      window,
      {
        buttons: ["Save, Then Quit", "Go Back to Editing", "Quit Without Saving"],
        cancelId: 1,
        type: "question",
        defaultId: 0,
        title: "Going so soon?",
        message: "Do you want to save your changes before quitting?",
      },
      (response: number, checkboxChecked: boolean) => {
        if (response === 0) {
          saveTranscript(window, getAppState("transcript"), () => {
            if (getAppState("userWantsToQuit") === true && getAppState("safeToQuit") === true) {
              app.exit()
            }
          })
        } else if (response === 1) {
          return null
        } else if (response === 2) {
          app.exit()
        }
      },
    )
  })
}
