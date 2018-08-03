import { ipcMain, Event as ElectronEvent, SaveDialogOptions, BrowserWindow, dialog } from "electron"
import { userWantsToSaveTranscript, heresTheTranscript } from "../common/ipcChannelNames"
import { isMacOS } from "../common/isMacOS"
import { writeFileSync } from "fs"
import path from "path"
import { setAppState, getAppState } from "../common/appState"

const saveDialogOptions: SaveDialogOptions = {
  filters: [{ name: "file extension", extensions: ["txt"] }],
  defaultPath: getAppState("lastSavedFilepath"),
  title: getAppState("lastSavedFileName"),
}

export const showSaveDialog: (
  window: BrowserWindow,
  transcript: string,
  callback?: () => void,
) => void = (window: BrowserWindow, transcript: string, callback: () => void) => {
  const appWindow: BrowserWindow | null = isMacOS ? window : null
  dialog.showSaveDialog(appWindow, saveDialogOptions, (filepath: string) => {
    if (filepath) {
      writeFileSync(filepath, transcript, { encoding: "utf-8" })
      const filename = path.parse(filepath).base
      setAppState("lastSavedFilepath", filepath)
      setAppState("lastSavedFileName", filename)
      setAppState("safeToQuit", true)
    }
    if (callback) callback()
  })
}

export const listenForWhenTheEditorChanges = () => {
  ipcMain.on(heresTheTranscript, (event: ElectronEvent, transcript: string) => {
    setAppState("transcript", transcript)
  })
}

export const listenForUserInitiatedSave: (window: BrowserWindow) => void = (
  window: BrowserWindow,
) => {
  console.log("listenForUserInitiatedSave")
  ipcMain.on(userWantsToSaveTranscript, (event: ElectronEvent, transcript: string) => {
    console.log("Should be showing save dialog ", transcript)
    showSaveDialog(window, transcript, () => {})
  })
}
