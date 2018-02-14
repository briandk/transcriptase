import * as moment from "moment";
import { ipcRenderer } from "electron";
import "moment-duration-format";
import Quill from "quill";

function getCurrentTime(): string {
  const player = document.getElementsByTagName("video")[0];
  // noinspection Annotator
  // noinspection Annotator
  const currentTime = moment.duration(player.currentTime, "seconds").format({
    template: "hh:mm:ss",
    precision: 2, // how many decimal places to show
    trim: false,
  });
  return `[${currentTime}] `;
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
