import { ipcMain, Event as ElectronEvent, SaveDialogOptions, BrowserWindow, dialog } from "electron"
import { userWantsToSaveTranscript } from "../common/ipcChannelNames"
import { isMacOS } from "../common/isMacOS"
import { writeFileSync } from "fs"
import path from "path"
import { setAppState, getAppState } from "../common/appState"

const saveDialogOptions: SaveDialogOptions = {
  filters: [{ name: "file extension", extensions: ["txt"] }],
  defaultPath: getAppState("lastSavedFilepath"),
  title: getAppState("lastSavedFileName"),
}

export const writeTranscriptToDisk = (filepath: string, transcript: string) => {
  writeFileSync(filepath, transcript, { encoding: "utf-8" })
  const filename = path.parse(filepath).base
  setAppState("lastSavedFilepath", filepath)
  setAppState("lastSavedFileName", filename)
  setAppState("safeToQuit", true)
}

export const saveTranscript = (
  window: BrowserWindow,
  transcript: string,
  callback?: () => void,
) => {
  const lastSavedFilepath = getAppState("lastSavedFilepath")
  if (lastSavedFilepath !== null) {
    writeTranscriptToDisk(lastSavedFilepath, transcript)
  } else {
    showSaveDialog(window, transcript)
  }
  if (callback) callback()
}

export const showSaveDialog: (
  window: BrowserWindow,
  transcript: string,
  callback?: () => void,
) => void = (window: BrowserWindow, transcript: string, callback: () => void) => {
  const appWindow: BrowserWindow | null = isMacOS ? window : null
  dialog.showSaveDialog(appWindow, saveDialogOptions, (filepath: string) => {
    if (filepath) {
      writeTranscriptToDisk(filepath, transcript)
    }
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
