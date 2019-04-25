import { join } from "path"
import { format } from "url"

export const loadURL = (
  window: Electron.BrowserWindow,
  appPath: string,
  showStorybook: boolean = false,
): void => {
  if (showStorybook) {
    window.loadURL("http://localhost:6006")
  } else {
    window.loadURL(
      format({
        pathname: join(appPath, "out/index.html"),
        protocol: "file:",
        slashes: true,
      }),
    )
  }
}
