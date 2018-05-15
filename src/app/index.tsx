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
} from "./saveTranscript";

import { RootComponent } from "./root-component";

import Quill from "quill";
import ReactDOM from "react-dom";

import "../../node_modules/video.js/dist/video-js.css";
import "../../node_modules/uikit/dist/css/uikit.css";
import "../../node_modules/quill/dist/quill.snow.css";
import "../../node_modules/font-awesome/css/font-awesome.css";

// import { handleAnyUnsavedChanges } from "../main/closeTheApp";
import { createTranscriptEditor } from "./transcriptEditor";

const setUpTheApp = () => {
  const editorContainer: Element = document.querySelector(".editor-container")!;
  const lastSavedPath: string = "data-last-saved-path";
  const videoPlayer = createVideoPlayer();
  const transcriptEditor: Quill = createTranscriptEditor();

  registerFileSelectionButtons();
  registerSaveHandlers(transcriptEditor, handleASaveClick, handleASaveAsClick);
  autosave(transcriptEditor);
  listenForInsertCurrentTimestampEvents(transcriptEditor);
  // registerClickHandlerForTimestampButton(transcriptEditor);
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

  // ipc.on("user-wants-to-close-the-app", (event) => {
  //   handleAnyUnsavedChanges(
  //     isEditorDirty(),
  //     transcriptEditor.getText(),
  //     editorContainer,
  //     editorContainer.getAttribute(lastSavedPath)!,
  //   );
  // });

  ipc.on("saved-file", (event, savePath) => {
    editorContainer!.setAttribute(lastSavedPath, savePath);
    setIsEditorDirty(false);
  });

  setInterval(3 * 1000);
};
ReactDOM.render(
  <RootComponent />,
  document.getElementById("root"),
  setUpTheApp,
);
