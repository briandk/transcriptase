import { BrowserWindow, ipcMain } from "electron"
import { closeTheWindow } from "../common/ipcChannelNames"

export const listenForKeyboardShortcutToCloseTheWindow = (
  window: BrowserWindow,
): void => {
  ipcMain.on(closeTheWindow, (): void => {
    window.close()
  })
}
