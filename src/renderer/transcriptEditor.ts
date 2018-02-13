import { Quill } from "quill";
import { formatTimestampsOnTextChange } from "./formatTimestamps";
import { TimestampBlot } from "../blots/Timestamp";

const transcriptEditor = new Quill(".transcript-editor", {
  modules: {
    toolbar: "#toolbar",
  },
  theme: "snow",
  placeholder: "Transcribe away...",
});

formatTimestampsOnTextChange(transcriptEditor);
Quill.register(TimestampBlot);

export { transcriptEditor };
