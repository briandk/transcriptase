import {
  Event,
  shell,
  ipcMain,
  MenuItemConstructorOptions,
  BrowserWindow,
  MenuItem,
} from "electron"
import { readFileSync } from "fs"

import {
  userHasChosenMediaFile,
  userHasChosenTranscriptFile,
  userWantsToSaveTranscript,
} from "../../renderer/ipcChannelNames"
import { promptUserToSelectFile } from "../selectFile"

export function createSharedMenuItems(window: BrowserWindow) {
  const visit: MenuItemConstructorOptions = {
    label: "On The Web",
    click() {
      if (process.env.HOMEPAGE) {
        shell.openExternal(process.env.HOMEPAGE)
      }
    },
  }

  const reload: MenuItemConstructorOptions = {
    label: "Reload",
    click() {
      window.webContents.reload()
    },
  }

  const storybook: MenuItemConstructorOptions = {
    label: "Toggle Storybook",
    click() {
      ipcMain.emit("storybook-toggle")
    },
  }

  const quit: MenuItemConstructorOptions = { label: "Quit", role: "quit" }

  const toggleDevTools: MenuItemConstructorOptions = {
    label: "Toggle Developer Tools",
    click() {
      window.webContents.toggleDevTools()
    },
  }

  const fullScreen: MenuItemConstructorOptions = {
    label: "Toggle Full Screen",
    click() {
      window.setFullScreen(!window.isFullScreen())
    },
  }

  return {
    visit,
    reload,
    storybook,
    quit,
    toggleDevTools,
    fullScreen,
  }
}

export const fileOperationsSubmenu: MenuItemConstructorOptions[] = [
  {
    label: "Load Media",
    accelerator: "CmdOrCtrl+O",
    click: (m: MenuItem, window: BrowserWindow, event: Event) => {
      const pathToFile = promptUserToSelectFile(window)
      window.webContents.send(userHasChosenMediaFile, pathToFile)
    },
  },
  {
    label: "Open Transcript",
    accelerator: "CmdOrCtrl+T",
    click: (item: MenuItem, window: BrowserWindow, event: Event) => {
      const pathToTranscript = promptUserToSelectFile(window)
      if (pathToTranscript) {
        const transcript = readFileSync(pathToTranscript, { encoding: "utf-8" })
        window.webContents.send(userHasChosenTranscriptFile, transcript.toString())
      }
    },
  },
  {
    label: "Save",
    accelerator: "CmdOrCtrl+S",
    click: (item: MenuItem, window: BrowserWindow, event: Event) => {
      window.webContents.send(userWantsToSaveTranscript)
    },
  },
  { type: "separator" },
  {
    label: "Close Window",
    accelerator: "CmdOrCtrl+W",
    click: (item: MenuItem, window: BrowserWindow, event: Event) => {
      window.close()
    },
  },
]

export const editMenu: MenuItemConstructorOptions = {
  label: "Edit",
  submenu: [
    {
      label: "Undo",
      accelerator: "CmdOrCtrl+Z",
      role: "undo",
    },
    {
      label: "Redo",
      accelerator: "Shift+CmdOrCtrl+Z",
      role: "redo",
    },
    {
      type: "separator",
    },
    {
      label: "Cut",
      accelerator: "CmdOrCtrl+X",
      role: "cut",
    },
    {
      label: "Copy",
      accelerator: "CmdOrCtrl+C",
      role: "copy",
    },
    {
      label: "Paste",
      accelerator: "CmdOrCtrl+V",
      role: "paste",
    },
    {
      label: "Select All",
      accelerator: "CmdOrCtrl+A",
      role: "selectall",
    },
    {
      type: "separator",
    },
    {
      label: "Insert Current Time",
      accelerator: "CmdOrCtrl+;",
      click: (menuItem: MenuItem, browserWindow: BrowserWindow, event: Event) => {
        browserWindow.webContents.send("insert-current-time", "clicked")
      },
    },
    {
      label: "Toggle Play/Pause",
      accelerator: "Tab",
      click: (menuItem: MenuItem, browserWindow: BrowserWindow, event: Event) => {
        const toggleMessage: string = "User has toggled play/Pause"
        browserWindow.webContents.send(toggleMessage)
      },
    },
    {
      label: "Skip Backward in Time",
      accelerator: "Shift+Tab",
      click: (): null => {
        // window.webContents.send(jumpBackwardsMessage)
        return null
      },
    },
  ],
}
