import * as moment from "moment";
import { transcriptEditor as editor } from "./transcriptEditor";
import { ipcRenderer } from "electron";
import "moment-duration-format";

const getCurrentTime = () => {
  const player = document.getElementsByTagName("video")[0];
  const currentTime = moment
    .duration(player.currentTime, "seconds")
    .format({
      template: "hh:mm:ss",
      precision: 2, // how many decimal places to show
      trim: false,
    });
  const formattedTimestamp = `[${currentTime}] `;
  return (formattedTimestamp);
};

const insertCurrentTimestamp = () => {
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
  timestampButton!.addEventListener(
    "click",
    () => { insertCurrentTimestamp(); },
  );
};

module.exports = {
  listenForInsertCurrentTimestampEvents,
  registerClickHandlerForTimestampButton,
};
