import { ipcMain, Event as ElectronEvent, SaveDialogOptions, BrowserWindow, dialog } from "electron"
import { userWantsToSaveTranscript, heresTheTranscript } from "../renderer/ipcChannelNames"
import { isMacOS } from "../common/isMacOS"
import { writeFileSync } from "fs"
import { setAppState, getAppState } from "../common/appState"

const saveDialogOptions: SaveDialogOptions = {
  filters: [{ name: null, extensions: ["txt"] }],
  defaultPath: getAppState("lastSavedFilepath"),
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
      setAppState("lastSavedFilepath", filepath)
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
  ipcMain.on(userWantsToSaveTranscript, (event: ElectronEvent, transcript: string) => {
    showSaveDialog(window, transcript, () => {})
  })
}
