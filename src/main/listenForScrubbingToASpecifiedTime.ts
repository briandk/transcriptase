import { ipcMain, IpcMainEvent } from "electron"
import {
  scrubVideoToTimecodeMain,
  scrubVideoToTimecodeRenderer,
} from "../common/ipcChannelNames"

export const listenForScrubVideoToTimecode = (): void => {
  ipcMain.on(
    scrubVideoToTimecodeMain,
    (event: IpcMainEvent, timeToScrubTo: number): void => {
      event.sender.send(scrubVideoToTimecodeRenderer, timeToScrubTo)
    },
  )
}
