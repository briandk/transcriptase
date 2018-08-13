import { setAppState } from "../common/appState"
import { Event as ElectronEvent, ipcMain } from "electron"
import { heresTheTranscript } from "../common/ipcChannelNames"

export const listenForTranscriptChanges = () => {
  ipcMain.on(heresTheTranscript, (event: ElectronEvent, transcript: string) => {
    console.log("transcript is", transcript)
    setAppState("transcript", transcript)
  })
}
