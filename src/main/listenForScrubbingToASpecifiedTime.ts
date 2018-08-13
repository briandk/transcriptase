import { Event as ElectronEvent, ipcMain } from "electron"
import { scrubVideoToTimecodeMain, scrubVideoToTimecodeRenderer } from "../common/ipcChannelNames"

export const listenForScrubVideoToTimecode = () => {
  ipcMain.on(scrubVideoToTimecodeMain, (event: ElectronEvent, timeToScrubTo: number) => {
    // console.log(`main heard the time to go to was ${timeToScrubTo}`)
    event.sender.send(scrubVideoToTimecodeRenderer, timeToScrubTo)
  })
}
