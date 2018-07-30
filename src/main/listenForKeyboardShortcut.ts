import { BrowserWindow, ipcMain } from "electron"
import { closeTheWindow } from "../renderer/ipcChannelNames"

export const listenForKeyboardShortcutToCloseTheWindow: (window: BrowserWindow) => void = (
  window: BrowserWindow,
) => {
  ipcMain.on(closeTheWindow, () => {
    console.log("heard you want to close")
    window.close()
  })
}
