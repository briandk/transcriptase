import Quill from "quill"
import "./styles/quill.core.css"
import "./styles/quill.snow.css"
// import { formatTimestampsOnTextChange } from "./formatTimestamps"

const createTranscriptEditor: () => any = () => {
  const transcriptEditor = new Quill(".transcript-editor", {
    modules: {
      toolbar: true,
    },
    theme: "snow",
    placeholder: "Transcribe away...",
  })
  //   formatTimestampsOnTextChange(transcriptEditor)
  return transcriptEditor
}

export { createTranscriptEditor }
