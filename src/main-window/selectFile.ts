import { BrowserWindow, dialog } from "electron"
import { isMacOS } from "../common/isMacOS"

export const promptUserToSelectFile = (window: BrowserWindow): string => {
  console.log("user should have been prompted!")

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

// export const registerMediaSelectionHandler: () => void = () => {
//   ipcMain.on(userWantsToLoadMedia, (event: Event) => {
//     const window = BrowserWindow.fromWebContents(event.sender)
//     const pathToMedia = promptUserToSelectMedia(window)
//     window.webContents.send(userHasChosenMediaFile, pathToMedia)
//   })
//   console.log("registered media selection handler!")
// }

// ipc.on('open-file-dialog', function (event) {
//   dialog.showOpenDialog({
//     properties: ['openFile', 'openDirectory']
//   }, function (files) {
//     if (files) event.sender.send('selected-directory', files)
//   })
// })
