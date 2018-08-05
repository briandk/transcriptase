import { BrowserWindow } from "electron"
import { promptUserToSelectFile } from "./selectFile"
import { readFileSync } from "fs"
import { userHasChosenTranscriptFile } from "../common/ipcChannelNames"

export const loadTranscriptFromPath = (window: BrowserWindow) => {
  const pathToTranscript = promptUserToSelectFile(window)
  if (pathToTranscript) {
    const transcript = readFileSync(pathToTranscript, { encoding: "utf-8" })
    window.webContents.send(userHasChosenTranscriptFile, transcript.toString())
  }
}
