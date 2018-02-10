import { BrowserWindow, dialog, Event } from "electron";
import { isMacOS } from "../common/isMacOS";

const showFileSelectionDialog = (event: Event) => {
  const window = BrowserWindow.fromWebContents(event.sender);
  let file;

  if (isMacOS) {
    file = dialog.showOpenDialog(window, { properties: ["openFile"] });
  } else {
    file = dialog.showOpenDialog({ properties: ["openFile"] });
  }
  return file || null;
};

module.exports = showFileSelectionDialog;
