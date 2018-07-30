import { BrowserWindow, dialog, ipcRenderer, MessageBoxOptions } from "electron"
import { userWantsToSaveTranscript } from "../renderer/ipcChannelNames"
import { setEditorIsDirty } from "./saveFile"

const dialogOptions: MessageBoxOptions = {
  title: "Save changes before closing?",
  type: "question",
  message: "Do you want to save your most recent transcript changes before you go?",
  buttons: ["Save Transcript", "Don't Save Transcript"],
  defaultId: 0,
}

export const saveBeforeClosing = (window: BrowserWindow) => {
  dialog.showMessageBox(window, dialogOptions, (response: number) => {
    if (response === 0) {
      ipcRenderer.sendSync(userWantsToSaveTranscript)

      return null
    } else if (response === 1) {
      setEditorIsDirty(false)
      window.close()
    }
  })
}

// mainWindow.on("close", function(e) {
//   var choice = require("electron").dialog.showMessageBox(this, {
//     type: "question",
//     buttons: ["Yes", "No"],
//     title: "Confirm",
//     message: "Are you sure you want to quit?",
//   })
//   if (choice == 1) {
//     e.preventDefault()
//   }
// })
