import { BrowserWindow, dialog } from "electron"
import { isMacOS } from "../common/isMacOS"

export const promptUserToSelectFile = (window: BrowserWindow): string => {
  let filePath = ""
  const appWindow: BrowserWindow | null = isMacOS ? window : null
  const files: string[] = dialog.showOpenDialog(appWindow, {
    properties: ["openFile"],
  })
  if (files && files.length === 1) {
    filePath = files.toString()
  }

  return filePath
}
