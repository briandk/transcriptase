import { Quill } from "quill";
import { formatTimestampsOnTextChange } from "./formatTimestamps";

const customBlots = ["Timestamp"];

const registerBlots = (blotNames: string[]) => {
  blotNames.map(
    ( blotName ) => {
      const blotPath = `./../blots/${blotName}`;
      const blot = require(blotPath);
      Quill.register(blot);
    },
  );
};

export let transcriptEditor = new Quill(".transcript-editor", {
  modules: {
    toolbar: "#toolbar",
  },
  theme: "snow",
  placeholder: "Transcribe away...",
});

formatTimestampsOnTextChange(transcriptEditor);
registerBlots(customBlots);
