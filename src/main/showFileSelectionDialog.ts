import { BrowserWindow, dialog, Event } from "electron";

const showFileSelectionDialog = (event: Event): string => {
  const window = BrowserWindow.fromWebContents(event.sender);
  const file: string = dialog
    .showOpenDialog(window, {
      properties: ["openFile"],
    })
    .toString();
  return file;
};

export { showFileSelectionDialog };
