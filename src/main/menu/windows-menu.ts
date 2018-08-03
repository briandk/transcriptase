import { createSharedMenuItems, editMenu, fileOperationsSubmenu } from "./shared-menu"
import isDev from "electron-is-dev"

export function createWindowsMenu(
  window: Electron.BrowserWindow,
): Electron.MenuItemConstructorOptions[] {
  const shared = createSharedMenuItems(window)

  // TODO: check what macFileMenu exports. There may be some
  //   type issues with how the mac, windows, and linux menus get constructed.
  //

  const fileMenu: Electron.MenuItemConstructorOptions = {
    label: "&File",
    submenu: fileOperationsSubmenu.concat({ label: "Quit", role: "quit", accelerator: "Alt+F4" }),
  }

  const viewMenu: Electron.MenuItemConstructorOptions = {
    label: "View",
    submenu: isDev
      ? [
          { ...shared.reload, accelerator: "Ctrl+R" },
          { ...shared.storybook, accelerator: "Ctrl+Shift+S" },
          { ...shared.toggleDevTools, accelerator: "Ctrl+Alt+I" },
        ]
      : [{ ...shared.fullScreen, accelerator: "Ctrl+Alt+F" }],
  }

  const helpMenu: Electron.MenuItemConstructorOptions = {
    label: "Help",
    submenu: [process.env.HOMEPAGE && shared.visit].filter(Boolean),
  }

  return [fileMenu, editMenu, viewMenu, helpMenu]
}
