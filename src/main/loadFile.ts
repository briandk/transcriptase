import { BrowserWindow, Event as ElectronEvent, ipcMain } from "electron"
import { promptUserToSelectFile } from "./selectFile"
import { readFileSync } from "fs"
import {
  userHasChosenTranscriptFile,
  userHasChosenMediaFile,
  getThisTranscriptPlease,
} from "../common/ipcChannelNames"
import { setAppState } from "../common/appState"

export const loadTranscriptFromPath = (
  window: BrowserWindow | null,
  path: string | null = null,
) => {
  const pathToTranscript = path || promptUserToSelectFile(window)
  if (pathToTranscript) {
    const transcript = readFileSync(pathToTranscript, { encoding: "utf-8" })
    window.webContents.send(userHasChosenTranscriptFile, transcript.toString())
    setAppState("lastSavedFilepath", pathToTranscript)
  }
}

export const loadMediaFileFromPath = (window: BrowserWindow, path: string | null = null) => {
  const pathToFile = path || promptUserToSelectFile(window)
  if (pathToFile) {
    window.webContents.send(userHasChosenMediaFile, pathToFile)
    setAppState("pathToMediaSource", pathToFile)
  }
}

export const listenForRequestToLoadTranscript = (window: BrowserWindow) => {
  ipcMain.on(getThisTranscriptPlease, (event: ElectronEvent, filePath: string) => {
    loadTranscriptFromPath(window, filePath)
  })
}
