import { Event as ElectronEvent, ipcMain } from "electron"
import {
  scrubVideoToTimecodeMain,
  scrubVideoToTimecodeRenderer,
} from "../common/ipcChannelNames"

export const listenForScrubVideoToTimecode = (): void => {
  ipcMain.on(
    scrubVideoToTimecodeMain,
    (event: ElectronEvent, timeToScrubTo: number): void => {
      event.sender.send(scrubVideoToTimecodeRenderer, timeToScrubTo)
    },
  )
}
