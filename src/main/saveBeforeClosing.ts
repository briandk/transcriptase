import {
  App,
  BrowserWindow,
  dialog,
  IpcMainEvent,
  MessageBoxSyncOptions,
} from "electron"
import { saveTranscript } from "./saveFile"
import { getAppState, setAppState } from "../common/appState"

const reminderToSaveBeforeClosingMessageBoxOptions: MessageBoxSyncOptions = {
  buttons: ["Save, Then Quit", "Go Back to Editing", "Quit Without Saving"],
  cancelId: 1,
  type: "question",
  defaultId: 0,
  title: "Going so soon?",
  message: "Do you want to save your changes before quitting?",
}

const saveThenQuit = 0
const goBackToEditing = 1
const quitWithoutSaving = 2

const warnUserThereAreUnsavedChangesBeforeQuitting = (window: BrowserWindow) =>
  dialog.showMessageBoxSync(
    window,
    reminderToSaveBeforeClosingMessageBoxOptions,
  )

export const rememberToSaveBeforeClosing = (
  window: BrowserWindow,
  app: App,
): void => {
  window.on("close", (event: IpcMainEvent): void => {
    event.preventDefault()
    setAppState("userWantsToQuit", true)
    const userChoice: number = warnUserThereAreUnsavedChangesBeforeQuitting(
      window,
    )
    if (userChoice === saveThenQuit) {
      saveTranscript(window, getAppState("transcript"))
      app.exit()
    } else if (userChoice === goBackToEditing) {
      return
    } else if (userChoice === quitWithoutSaving) {
      app.exit()
    }
  })
}
