// const ipc = require("electron").ipcRenderer;
import {
  ipcRenderer as ipc,
} from "electron";
// const dialog = require("electron").dialog;
import {
  dialog,
} from "electron";
// const Delta = require("quill-delta");
import {
  delta as Delta,
} from "quill-delta";

import * as fs from "fs";

import {
  isMacOS,
} from "./isMacOS";

const saveOptions = {
  filters: [{
    extensions: ["txt"],
    name: "text",
    }, // sets default file extension
  ],
  properties: ["createDirectory"],
  title: "Save Your Transcript",
};

let isTranscriptEditorDirty = true; // eslint-disable-line no-unused-vars

export function registerSaveHandlers(transcriptEditor, saveHandler, saveAsHandler) {
  const saveButton = document.querySelector(".save-transcript")!;
  const saveAsButton = document.querySelector(".save-transcript-as")!;

  saveButton.addEventListener("click", () => {
    saveHandler(transcriptEditor);
  });
  saveAsButton.addEventListener("click", () => {
    saveAsHandler(transcriptEditor);
  });
}

export function handleASaveClick(transcriptEditor) {
  ipc.send(
    "save-transcript",
    transcriptEditor.getText(),
    document
    .querySelector(".editor-container")! // ! asserts the return value won't be null
    .getAttribute("data-last-saved-path"),
    false,
  );
}

export function handleASaveAsClick(transcriptEditor) {
  ipc.send("save-transcript", transcriptEditor.getText(), null, false);
}

export function saveFile(
  event,
  transcriptText,
  lastSavedPath,
  appWindow,
  quitAfterSaving = false,
) {
  const window = isMacOS() ? appWindow : null;
  const savePath =
    lastSavedPath || dialog.showSaveDialog(window, saveOptions);

  if (savePath) {
    fs.writeFile(savePath, transcriptText, (err) => {
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

export function autosave(transcriptEditor) {
  let change = new Delta();
  const autosaveInterval = 3 * 1000; // milliseconds
  const saveIfDocumentHasChanged = () => {
    const lastSavedPath = document
      .querySelector(".editor-container")!
      .getAttribute("data-last-saved-path");
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

export function setIsEditorDirty(truthValue) {
  isTranscriptEditorDirty = truthValue;
}

export function isEditorDirty() {
  return isTranscriptEditorDirty;
}

//
// TO save the transcript
//   wire up the "Save" button
//   save the file
//   update the last-saved path
//
// TO wire up the "Save button"
//   select the save button element
//   register `handle a save click` on the element
//

// ------
// TO save the file
//   receive a renderer message containing:
//     - the text of the transcript
//     - the value of the last path the user saved to (might be null or empty string)
//   IF there's no last saved path
//     show a dialog box to let the user select the path
//   write the file to disk
//   send a message to RENDERER containing:
//     - the path written to
//
// TO update the last-saved-path
//   receive a message containing:
//     - the path written to
//   select the editor container element
//   set the data-last-saved-path attribute
//
// TO handle a save click
//   send a message to MAIN containing:
//     - the text of the transcript
//     - the value (if it exists) of the last path the user saved to
//
