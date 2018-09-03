import { Event as ElectronEvent, ipcMain } from "electron"
import { scrubVideoToTimecodeMain, scrubVideoToTimecodeRenderer } from "../common/ipcChannelNames"

export const listenForScrubVideoToTimecode = () => {
  ipcMain.on(scrubVideoToTimecodeMain, (event: ElectronEvent, timeToScrubTo: number) => {
    event.sender.send(scrubVideoToTimecodeRenderer, timeToScrubTo)
  })
}
