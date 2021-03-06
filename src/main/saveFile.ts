import {
  ipcMain,
  IpcMainEvent,
  SaveDialogOptions,
  BrowserWindow,
  dialog,
} from "electron"
import { userWantsToSaveTranscript } from "../common/ipcChannelNames"
import { isMacOS } from "../common/isMacOS"
import { writeFileSync } from "fs"
import path from "path"
import { homedir } from "os"
import { setAppState, getAppState } from "../common/appState"

const saveDialogOptions: SaveDialogOptions = {
  filters: [{ name: "file extension", extensions: ["txt"] }],
  defaultPath: getAppState("lastSavedFilepath") || homedir(),
  title: getAppState("lastSavedFileName"),
}

export const writeTranscriptToDisk = (
  filepath: string,
  transcript: string,
): void => {
  writeFileSync(filepath, transcript, { encoding: "utf-8" })
  const filename = path.parse(filepath).base
  setAppState("lastSavedFilepath", filepath)
  setAppState("lastSavedFileName", filename)
  setAppState("safeToQuit", true)
}

export const showSaveDialog = (
  window: BrowserWindow,
  transcript: string,
): void => {
  const appWindow: BrowserWindow | null = isMacOS ? window : null
  const filePath: string = dialog.showSaveDialogSync(
    appWindow,
    saveDialogOptions,
  )
  if (filePath) {
    writeTranscriptToDisk(filePath, transcript)
  }
}

export const saveTranscript = (
  window: BrowserWindow,
  transcript: string,
): void => {
  const lastSavedFilepath = getAppState("lastSavedFilepath")
  if (lastSavedFilepath !== "") {
    writeTranscriptToDisk(lastSavedFilepath, transcript)
  } else {
    showSaveDialog(window, transcript)
  }
}

export const listenForUserInitiatedSave: (window: BrowserWindow) => void = (
  window: BrowserWindow,
): void => {
  ipcMain.on(
    userWantsToSaveTranscript,
    (event: IpcMainEvent, transcript: string): void => {
      showSaveDialog(window, transcript)
    },
  )
}
