import { App, BrowserWindow, dialog, Event as ElectronEvent } from "electron"
import { saveTranscript } from "./saveFile"
import { getAppState, setAppState } from "../common/appState"

const promptUserToSave = (
  response: number,
  app: App,
  window: BrowserWindow,
): void => {
  if (response === 0) {
    saveTranscript(window, getAppState("transcript"), (): void => {
      if (
        getAppState("userWantsToQuit") === true &&
        getAppState("safeToQuit") === true
      ) {
        app.quit()
      }
    })
  } else if (response === 1) {
    null
  } else if (response === 2) {
    app.exit()
  }
}

export const rememberToSaveBeforeClosing = (
  window: BrowserWindow,
  app: App,
): void => {
  window.on("close", (event: ElectronEvent): void => {
    setAppState("userWantsToQuit", true)
    event.preventDefault()
    const userChoice = dialog.showMessageBoxSync(window, {
      buttons: ["Save, Then Quit", "Go Back to Editing", "Quit Without Saving"],
      cancelId: 1,
      type: "question",
      defaultId: 0,
      title: "Going so soon?",
      message: "Do you want to save your changes before quitting?",
    })
    promptUserToSave(userChoice, app, window)
  })
}
