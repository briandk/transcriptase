import { createVideoPlayer } from "./createVideoPlayer";
import { ipcRenderer as ipc } from "electron";
import { registerFileSelectionEvent as registerFileSelectionButtons } from "./registerFileSelectionEvent";
import {
  listenForInsertCurrentTimestampEvents,
  registerClickHandlerForTimestampButton,
} from "./insertCurrentTime";

import {
  handlePlayPauseToggle,
  handleJumpingBackNSeconds,
} from "../common/controlPlayback";
import {
  autosave,
  registerSaveHandlers,
  handleASaveClick,
  handleASaveAsClick,
  isEditorDirty,
  setIsEditorDirty,
} from "../common/saveTranscript";

import { handleAnyUnsavedChanges } from "../common/closeTheApp";
const editorContainer: Element = document.querySelector(".editor-container");
const lastSavedPath: string = "data-last-saved-path";

const transcriptEditor = require("./renderer-process/transcriptEditor");
const videoPlayer = createVideoPlayer();

registerFileSelectionButtons();
registerSaveHandlers(transcriptEditor, handleASaveClick, handleASaveAsClick);
autosave(transcriptEditor);
listenForInsertCurrentTimestampEvents();
registerClickHandlerForTimestampButton();
handlePlayPauseToggle(videoPlayer);
handleJumpingBackNSeconds(videoPlayer);

ipc.on("a-file-was-selected", (event, filepath, roleOfFile) => {
  if (roleOfFile === "transcript") {
    ipc.send("read-transcript-from-filepath", filepath);
  } else if (roleOfFile === "video") {
    videoPlayer.src(filepath);
  }
});

ipc.on("transcript-was-read-from-file", (event, fileContents, filePath) => {
  transcriptEditor.setText(fileContents, "user");
  editorContainer!.setAttribute(lastSavedPath, filePath);
  setIsEditorDirty(false);
});

ipc.on("user-wants-to-close-the-app", (event) => {
  handleAnyUnsavedChanges(
    isEditorDirty(),
    transcriptEditor,
    editorContainer,
    editorContainer.getAttribute(lastSavedPath)!,
  );
});

ipc.on("saved-file", (event, savePath) => {
  editorContainer!.setAttribute(lastSavedPath, savePath);
  setIsEditorDirty(false);
});

setInterval(3 * 1000);
