import {
  shell,
  ipcMain,
  MenuItemConstructorOptions,
  BrowserWindow,
  MenuItem,
} from "electron"
import { saveTranscript, showSaveDialog } from "../saveFile"

import {
  userHasToggledPlayPause,
  insertCurrentTime,
  jumpBackInTime,
} from "../../common/ipcChannelNames"
import { getAppState } from "../../common/appState"
import { loadTranscriptFromPath, loadMediaFileFromPath } from "../loadFile"

interface SharedMenuItems {
  visit: MenuItemConstructorOptions
  reload: MenuItemConstructorOptions
  storybook: MenuItemConstructorOptions
  quit: MenuItemConstructorOptions
  toggleDevTools: MenuItemConstructorOptions
  fullScreen: MenuItemConstructorOptions
}

export function createSharedMenuItems(window: BrowserWindow): SharedMenuItems {
  const visit: MenuItemConstructorOptions = {
    label: "On The Web",
    click(): void {
      if (process.env.HOMEPAGE) {
        shell.openExternal(process.env.HOMEPAGE)
      }
    },
  }

  const reload: MenuItemConstructorOptions = {
    label: "Reload",
    click(): void {
      window.webContents.reload()
    },
  }

  const storybook: MenuItemConstructorOptions = {
    label: "Toggle Storybook",
    click(): void {
      ipcMain.emit("storybook-toggle")
    },
  }

  const quit: MenuItemConstructorOptions = { label: "Quit", role: "quit" }

  const toggleDevTools: MenuItemConstructorOptions = {
    label: "Toggle Developer Tools",
    click(): void {
      window.webContents.toggleDevTools()
    },
  }

  const fullScreen: MenuItemConstructorOptions = {
    label: "Toggle Full Screen",
    click(): void {
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
    click: (m: MenuItem, window: BrowserWindow): void => {
      loadMediaFileFromPath(window)
    },
  },
  {
    label: "Open Transcript",
    accelerator: "CmdOrCtrl+T",
    click: (item: MenuItem, window: BrowserWindow): void => {
      loadTranscriptFromPath(window)
    },
  },
  {
    label: "Save Transcript",
    accelerator: "CmdOrCtrl+S",
    click: (item: MenuItem, window: BrowserWindow): void => {
      saveTranscript(window, getAppState("transcript"))
    },
  },
  {
    label: "Save Transcript As...",
    accelerator: "CmdOrCtrl+Shift+S",
    click: (item: MenuItem, window: BrowserWindow): void => {
      showSaveDialog(window, getAppState("transcript"))
    },
  },
  { type: "separator" },
  {
    label: "Close Window",
    accelerator: "CmdOrCtrl+W",
    click: (item: MenuItem, window: BrowserWindow): void => {
      window.close()
    },
  },
]

const editSubmenu: MenuItemConstructorOptions[] = [
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
    role: "selectAll",
  },
  {
    type: "separator",
  },
  {
    label: "Insert Current Time",
    accelerator: "CmdOrCtrl+;",
    click: (menuItem: MenuItem, browserWindow: BrowserWindow): void => {
      browserWindow.webContents.send(insertCurrentTime, "clicked")
    },
  },
  {
    label: "Toggle Play/Pause",
    accelerator: "F8",
    click: (menuItem: MenuItem, browserWindow: BrowserWindow): void => {
      browserWindow.webContents.send(userHasToggledPlayPause)
    },
  },
  {
    label: "Skip Backward in Time",
    accelerator: "F7",
    click: (menuItem: MenuItem, browserWindow: BrowserWindow): void => {
      browserWindow.webContents.send(jumpBackInTime)
      return null
    },
  },
]

export const editMenu: MenuItemConstructorOptions = {
  label: "Edit",
  submenu: editSubmenu,
}
