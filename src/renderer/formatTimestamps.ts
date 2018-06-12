import { MatchedTimestamp, matchTimestamps } from "./matchTimestamps";
import { scrubVideoToTimestamp } from "./scrubVideoToTimestamp";
import Quill from "quill";

const formatMatchedTimestamps = (editor: Quill) => {
  const matches: MatchedTimestamp[] = matchTimestamps(editor.getText());
  matches.map((match: MatchedTimestamp) => {
    editor.formatText(match.index, match.length, { timestamp: true });
  });
  const timestamps: HTMLCollection = document.getElementsByClassName(
    "timestamp",
  );

  for (const timestamp of timestamps as any) {
    timestamp.addEventListener("click", scrubVideoToTimestamp, false);
  }
};

export function formatTimestampsOnTextChange(editor: Quill) {
  editor.on("text-change", (delta, oldDelta, source) => {
    if (source === "user") {
      formatMatchedTimestamps(editor);
    }
  });
}
