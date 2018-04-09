import { ipcRenderer } from "electron";
import Quill from "quill";
import { DateTime, Duration } from "luxon";

function getCurrentTime(): string {
  const player = document.getElementsByTagName("video")[0];
  // noinspection Annotator
  // noinspection Annotator
  const currentTime = DateTime.fromFormat(
    player.currentTime.toString(),
    "s.SSS",
  );
  const formattedCurrentTime = currentTime.toFormat("hh:mm:ss.SSS");
  return `[${formattedCurrentTime}] `;
}

const insertCurrentTimestamp = (editor: Quill): void => {
  const cursorPosition = editor.getSelection(true).index;
  const timeStamp = getCurrentTime();
  const cursorPositionAfterInsert = cursorPosition + timeStamp.length;
  editor.insertText(cursorPosition, timeStamp, "user");
  editor.setSelection(cursorPositionAfterInsert, 0, "user");
};

const listenForInsertCurrentTimestampEvents = (editor: Quill) => {
  ipcRenderer.on("insert-current-time", () => {
    insertCurrentTimestamp(editor);
  });
};

const registerClickHandlerForTimestampButton = (editor: Quill) => {
  const timestampButton = document.getElementById("#timestamp-button");
  timestampButton!.addEventListener("click", () => {
    insertCurrentTimestamp(editor);
  });
};

export {
  listenForInsertCurrentTimestampEvents,
  registerClickHandlerForTimestampButton,
};
