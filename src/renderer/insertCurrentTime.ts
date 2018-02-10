import * as moment from "moment";
import { transcriptEditor as editor } from "./transcriptEditor";
import { ipcRenderer } from "electron";
import "moment-duration-format";

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

const insertCurrentTimestamp = (): void => {
  const cursorPosition = editor.getSelection(true).index;
  const timeStamp = getCurrentTime();
  const cursorPositionAfterInsert = cursorPosition + timeStamp.length;
  editor.insertText(cursorPosition, timeStamp, "user");
  editor.setSelection(cursorPositionAfterInsert, 0, "user");
};

const listenForInsertCurrentTimestampEvents = () => {
  ipcRenderer.on("insert-current-time", () => {
    insertCurrentTimestamp();
  });
};

const registerClickHandlerForTimestampButton = () => {
  const timestampButton = document.getElementById("#timestamp-button");
  timestampButton!.addEventListener("click", () => {
    insertCurrentTimestamp();
  });
};

export {
  listenForInsertCurrentTimestampEvents,
  registerClickHandlerForTimestampButton,
};
