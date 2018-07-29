import { dialog, Event, BrowserWindow } from "electron"
import { isMacOS } from "../common/isMacOS"

export const showSaveDialog: (window: BrowserWindow, event: Event) => void = (
  window: BrowserWindow,
  event: Event,
) => {
  const appWindow: BrowserWindow | null = isMacOS ? window : null
  dialog.showSaveDialog(appWindow, null, () => console.log("file saved"))
}
