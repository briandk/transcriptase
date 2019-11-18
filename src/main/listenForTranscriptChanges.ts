import { setAppState } from "../common/appState"
import { Event as ElectronEvent, ipcMain } from "electron"
import { heresTheTranscript } from "../common/ipcChannelNames"

export const listenForTranscriptChanges = (): void => {
  ipcMain.on(
    heresTheTranscript,
    (event: ElectronEvent, transcript: string): void => {
      setAppState("transcript", transcript)
    },
  )
}
