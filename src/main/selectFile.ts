import { BrowserWindow, dialog, OpenDialogOptions } from "electron"
import { isMacOS } from "../common/isMacOS"

const options: OpenDialogOptions = {
  properties: ["openFile", "treatPackageAsDirectory", "createDirectory", "promptToCreate"],
  message: "Choose a media file",
  title: "Choose a media file",
}

export const promptUserToSelectFile = (window: BrowserWindow): string => {
  let filePath = null
  const appWindow: BrowserWindow | null = isMacOS ? window : null
  const files: string[] = dialog.showOpenDialog(appWindow, options)

  if (files && files.length === 1) {
    filePath = files.toString()
  }

  return filePath
}
