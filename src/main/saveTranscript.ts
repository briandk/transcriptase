import { BrowserWindow, dialog, ipcMain as ipc } from "electron";
import { writeFile } from "fs";
import { isMacOS } from "../common/isMacOS";
import { saveOptions } from "../common/saveOptions";
import { userWantsToSaveTranscript } from "../common/messageNames";

// MAIN
//     LET there be a last_saved_path variable

let lastSavedPath: string;
let transcriptText: string;

ipc.on("emit-transcript-as-text", (emittedText) => {
  transcriptText = emittedText;
});

function promptUserForSavePath(
  dialogOptions: object,
  window: BrowserWindow,
): string {
  let savePath: string;
  if (isMacOS()) {
    savePath = dialog.showSaveDialog(window, dialogOptions);
  } else {
    savePath = dialog.showSaveDialog(dialogOptions);
  }
  return savePath;
}

function saveFile(
  appWindow: BrowserWindow,
  quitAfterSaving: boolean = false,
): void {
  lastSavedPath =
    lastSavedPath || promptUserForSavePath(saveOptions, appWindow);

  if (lastSavedPath) {
    writeFile(lastSavedPath, transcriptText, (err) => {
      if (err) {
        throw err;
      }
      if (quitAfterSaving) {
        appWindow.destroy();
      }
    });
  }
}

export function registerSaveHandler(appWindow: BrowserWindow): void {
  ipc.on(userWantsToSaveTranscript, () => {
    saveFile(appWindow);
  });
}

//     REGISTER an ipc.on event:
//         WHEN the user intends to save the file:
//             IF the last_saved_path is not NULL:
//                 WRITE contents_of_the_editor to last_saved_path
//             ELSE:
//                 SHOW a dialog so the user can choose where to save the file:
//                     UPDATE last_saved_path as the user's choice
//                 WRITE contents_of_the_editor to last_saved_path
