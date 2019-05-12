import { app } from "electron"
import { createSharedMenuItems, editMenu } from "./shared-menu"
import { fileOperationsSubmenu } from "./shared-menu"
import isDev from "electron-is-dev"

export function createMacMenu(
  window: Electron.BrowserWindow,
): Electron.MenuItemConstructorOptions[] {
  const shared = createSharedMenuItems(window)
  const name: string = app.getName()

  const appMenu: Electron.MenuItemConstructorOptions = {
    label: name,
    submenu: [
      { label: `About ${name}` },
      { type: "separator" },
      { label: `Hide ${name}`, accelerator: "Command+H" },
      {
        label: "Hide Others",
        accelerator: "Command+Option+H",
      },
      { label: "Show All" },
      { type: "separator" },
      { ...shared.quit, accelerator: "Command+Q" },
    ],
  }
  const fileMenu: Electron.MenuItemConstructorOptions = {
    label: "File",
    type: "submenu",
    submenu: fileOperationsSubmenu,
  }

  const viewMenu: Electron.MenuItemConstructorOptions = {
    label: "View",
    submenu: isDev
      ? [
          { ...shared.reload, accelerator: "Command+R" },
          { ...shared.storybook, accelerator: "Alt+Shift+S" },
          { ...shared.toggleDevTools, accelerator: "Alt+Command+I" },
        ]
      : [{ ...shared.fullScreen, accelerator: "Ctrl+Command+F" }],
  }

  const helpMenu: Electron.MenuItemConstructorOptions = {
    label: "Help",
    submenu: [process.env.HOMEPAGE && shared.visit].filter(Boolean),
  }

  return [appMenu, fileMenu, editMenu, viewMenu, helpMenu]
}
