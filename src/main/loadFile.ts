import { BrowserWindow } from "electron"
import { promptUserToSelectFile } from "./selectFile"
import { readFileSync } from "fs"
import { userHasChosenTranscriptFile, userHasChosenMediaFile } from "../common/ipcChannelNames"
import { setAppState } from "../common/appState"

export const loadTranscriptFromPath = (window: BrowserWindow) => {
  const pathToTranscript = promptUserToSelectFile(window)
  if (pathToTranscript) {
    const transcript = readFileSync(pathToTranscript, { encoding: "utf-8" })
    window.webContents.send(userHasChosenTranscriptFile, transcript.toString())
    setAppState("lastSavedFilepath", pathToTranscript)
  }
}

export const loadMediaFileFromPath = (window: BrowserWindow) => {
  const pathToFile = promptUserToSelectFile(window)
  if (pathToFile) {
    window.webContents.send(userHasChosenMediaFile, pathToFile)
    setAppState("pathToMediaSource", pathToFile)
  }
}
