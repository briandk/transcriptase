import Quill from "quill";
import { formatTimestampsOnTextChange } from "./formatTimestamps";

const createTranscriptEditor: () => any = () => {
  const transcriptEditor = new Quill(".transcript-editor", {
    modules: {
      toolbar: "#toolbar",
    },
    theme: "snow",
    placeholder: "Transcribe away...",
  });
  formatTimestampsOnTextChange(transcriptEditor);
  return transcriptEditor;
};

export { createTranscriptEditor };
