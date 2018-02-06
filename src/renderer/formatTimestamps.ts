import { matchTimestamps } from "./matchTimestamps";
import { scrubVideoToTimestamp } from "./scrubVideoToTimestamp";
import { Quill } from "quill";

const formatMatchedTimestamps = (editor) => {
  const matches = matchTimestamps(editor.getText());
  matches.map((match) => {
    editor.formatText(match.index, match.length, { timestamp: true });
  });
  const timestamps = document.getElementsByClassName("timestamp");

  for (const timestamp of timestamps as any) {
    timestamp.addEventListener("click", scrubVideoToTimestamp, false);
  }
  // timestamps.map(
  //   function (element) {
  //     element.addEventListener('click', scrubVideoToTimestamp, false)
  //   }
  // )
};

export function formatTimestampsOnTextChange(editor: Quill) {
  editor.on(
    "text-change",
    (delta, oldDelta, source) => {
      if (source === "user") {
        formatMatchedTimestamps(editor);
      }
    },
  );
}
