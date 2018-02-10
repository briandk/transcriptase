import { ipcRenderer as ipc, dialog, BrowserWindow } from "electron";

import { Delta } from "quill";
import { writeFile } from "fs-plus";
import { isMacOS } from "./isMacOS";
import { Quill } from "quill";

const saveOptions = {
  filters: [
    {
      extensions: ["txt"],
      name: "text",
    }, // sets default file extension
  ],
  properties: ["createDirectory"],
  title: "Save Your Transcript",
};

let isTranscriptEditorDirty = true;

export function registerSaveHandlers(
  transcriptEditor: Quill,
  saveHandler: (editor: Quill) => void,
  saveAsHandler: (editor: Quill) => void,
) {
  const saveButton = document.querySelector(".save-transcript")!;
  const saveAsButton = document.querySelector(".save-transcript-as")!;

  saveButton.addEventListener("click", () => {
    saveHandler(transcriptEditor);
  });
  saveAsButton.addEventListener("click", () => {
    saveAsHandler(transcriptEditor);
  });
}

export function handleASaveClick(transcriptEditor: Quill) {
  ipc.send(
    "save-transcript",
    transcriptEditor.getText(),
    document.querySelector(".editor-container")! // ! asserts the return value won't be null
      .getAttribute("data-last-saved-path"),
    false,
  );
}

export function handleASaveAsClick(transcriptEditor: Quill) {
  ipc.send("save-transcript", transcriptEditor.getText(), null, false);
}

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

export function saveFile(
  transcriptText: string,
  lastSavedPath: string,
  appWindow: BrowserWindow,
  quitAfterSaving: boolean = false,
): void {
  const savePath =
    lastSavedPath || promptUserForSavePath(saveOptions, appWindow);

  if (savePath) {
    writeFile(savePath, transcriptText, (err) => {
      if (err) {
        throw err;
      } else {
        appWindow.webContents.send("saved-file", savePath);
        if (quitAfterSaving) {
          appWindow.destroy();
        }
      }
    });
  }
}

export function autosave(transcriptEditor: Quill) {
  let change = new Delta();
  const autosaveInterval = 3 * 1000; // milliseconds
  const saveIfDocumentHasChanged = () => {
    const lastSavedPath = document.querySelector(
      ".editor-container",
    )!.getAttribute("data-last-saved-path");
    if (change.length() > 0 && lastSavedPath) {
      ipc.send("save-transcript", transcriptEditor.getText(), lastSavedPath);
      change = new Delta();
    }
  };
  transcriptEditor.on("text-change", (delta) => {
    change = change.compose(delta);
  });
  setInterval(saveIfDocumentHasChanged, autosaveInterval);
}

export function setIsEditorDirty(truthValue: boolean): void {
  isTranscriptEditorDirty = truthValue;
}

export function isEditorDirty(): boolean {
  return isTranscriptEditorDirty;
}
