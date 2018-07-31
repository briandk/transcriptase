import { dialog, Event as ElectronEvent, BrowserWindow, ipcMain } from "electron"
import { writeFileSync } from "fs"
import { isMacOS } from "../common/isMacOS"
import { heresTheTranscript } from "../renderer/ipcChannelNames"
import { setAppState } from "../common/appState"

let editorHasUnsavedChanges = false

export interface transcriptState {
  transcript: string
}

export const setEditorIsDirty = (unsavedChanges = true) => {
  editorHasUnsavedChanges = unsavedChanges
  return editorHasUnsavedChanges
}

export const editorIsDirty = () => {
  return editorHasUnsavedChanges
}

export const showSaveDialog: (window: BrowserWindow, transcript: string) => void = (
  window: BrowserWindow,
  transcript: string,
) => {
  const appWindow: BrowserWindow | null = isMacOS ? window : null
  dialog.showSaveDialog(appWindow, null, (filepath: string) => {
    if (filepath) {
      writeFileSync(filepath, transcript, { encoding: "utf-8" })
      setEditorIsDirty(false)
    }
  })
}

export const registerSaveHandler = (window: BrowserWindow) => {}

export const listenForWhenTheEditorChanges = () => {
  ipcMain.on(heresTheTranscript, (event: ElectronEvent, transcript: string) => {
    setAppState({ transcript: transcript })
  })
}