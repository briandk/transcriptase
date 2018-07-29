import { dialog, Event as ElectronEvent, BrowserWindow, ipcMain } from "electron"
import { writeFileSync } from "fs"
import { isMacOS } from "../common/isMacOS"
import { heresTheTranscript } from "../app/ipcChannelNames"

const showSaveDialog: (window: BrowserWindow, transcript: string) => void = (
  window: BrowserWindow,
  transcript: string,
) => {
  console.log("showing the save dialog!")
  const appWindow: BrowserWindow | null = isMacOS ? window : null
  dialog.showSaveDialog(appWindow, null, (filepath: string) =>
    writeFileSync(filepath, transcript, { encoding: "utf-8" }),
  )
}

export const registerSaveHandler = (window: BrowserWindow) => {
  ipcMain.on(heresTheTranscript, (event: ElectronEvent, transcript: string) =>
    showSaveDialog(window, transcript),
  )
}
