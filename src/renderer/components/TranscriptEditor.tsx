import { userHasChosenTranscriptFile } from "../../common/ipcChannelNames"
import { ipcRenderer } from "electron"
import React, { useMemo, useState, useEffect } from "react"
import { createEditor, Node } from "slate"
import { Slate, Editable, withReact } from "slate-react"

const initialTranscriptValue: Node[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
]

function deserializeTranscript(transcript: string): Node[] {
  const value = transcript.split("\n").map((s) => {
    return {
      type: "paragraph",
      children: [{ text: s }],
    }
  })
  console.log("transcript is", value)
  return value
}

function App(): JSX.Element {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState<Node[]>(initialTranscriptValue)

  // listen for load events; clean up listeners when component will unmount
  useEffect(() => {
    ipcRenderer.on(userHasChosenTranscriptFile, (event, transcript) =>
      setValue(deserializeTranscript(transcript)),
    )
    return function cleanup(): void {
      ipcRenderer.removeListener(
        userHasChosenTranscriptFile,
        (event, transcript) => {
          setValue(deserializeTranscript(transcript))
        },
      )
    }
  })

  return (
    <Slate
      id="editor"
      editor={editor}
      value={value}
      onChange={(value): void => setValue(value)}
    >
      <Editable placeholder="Drag a text file here to open it, or just start typing!" />
    </Slate>
  )
}

export { App as TranscriptEditor }
