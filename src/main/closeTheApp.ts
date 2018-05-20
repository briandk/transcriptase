import { ipcRenderer } from "electron";

export function handleAnyUnsavedChanges(
  isEditorDirty: boolean,
  transcriptEditorContents: string,
  editorContainer: Element,
  lastSavedPath: string,
): void {
  if (isEditorDirty) {
    ipcRenderer.send(
      "show-unsaved-changes-dialog",
      transcriptEditorContents,
      editorContainer.getAttribute(lastSavedPath),
    );
  } else if (!isEditorDirty) {
    ipcRenderer.send("its-safe-to-close-the-app");
  }
}
