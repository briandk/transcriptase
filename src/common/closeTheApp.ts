//
import { isMacOS } from "./isMacOS";
import { Quill } from "quill";
//
import { dialog, ipcRenderer } from "electron";
import { saveFile } from "./saveTranscript";
import { BrowserWindow } from "electron";

export function handleAnyUnsavedChanges(
  isEditorDirty: boolean,
  transcriptEditor: Quill,
  editorContainer: Element,
  lastSavedPath: string,
): void {
  if (isEditorDirty) {
    ipcRenderer.send(
      "show-unsaved-changes-dialog",
      transcriptEditor.getText(),
      editorContainer.getAttribute(lastSavedPath),
    );
  } else if (!isEditorDirty) {
    ipcRenderer.send("its-safe-to-close-the-app");
  }
}

export function showUnsavedChangesDialog(
  event,
  appWindow: BrowserWindow,
  transcriptText: string,
  lastSavedPath: string,
) {
  const dialogBoxWindow = isMacOS ? appWindow : null;
  dialog.showMessageBox(
    dialogBoxWindow, //  the problem is here, we're not showing the dialog box conditioned on whether or not the file is dirty. One possibility is that we have a variable in the transcript editor module, And that variable gets exported.
    {
      message:
        "It looks like you have unsaved changes. What would you like to do?",
      buttons: [
        "Save Transcript and Close",
        "Continue Editing",
        "Close Without Saving",
      ],
      defaultId: 0,
    },
    (response) => {
      if (response === 2) {
        appWindow.destroy();
      } else if (response === 1) {
        return false;
      } else if (response === 0) {
        saveFile(transcriptText, lastSavedPath, appWindow, true);
      }
    },
  );
}
