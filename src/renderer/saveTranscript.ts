import { BrowserWindow, dialog, ipcRenderer as ipc } from "electron";

import Quill from "quill";
const Delta = Quill.import("delta");

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
    document
      .querySelector(".editor-container")! // ! asserts the return value won't be null
      .getAttribute("data-last-saved-path"),
    false,
  );
}

export function handleASaveAsClick(transcriptEditor: Quill) {
  ipc.send("save-transcript", transcriptEditor.getText(), null, false);
}

export function autosave(transcriptEditor: Quill) {
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

export function setIsEditorDirty(truthValue: boolean): void {
  isTranscriptEditorDirty = truthValue;
}

export function isEditorDirty(): boolean {
  return isTranscriptEditorDirty;
}
