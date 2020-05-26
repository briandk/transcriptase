import {
  heresTheTranscript,
  userHasChosenTranscriptFile,
} from "../../common/ipcChannelNames"
import { ipcRenderer } from "electron"
import React, { useMemo, useState, useEffect } from "react"
import { deserializeTranscript, serializeTranscript } from "../serialization"
import { createEditor, Node } from "slate"
import { Slate, Editable, withReact } from "slate-react"

const initialTranscriptValue: Node[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
]

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
      onChange={(value): void => {
        setValue(value)
        ipcRenderer.send(heresTheTranscript, serializeTranscript(value))
      }}
    >
      <Editable placeholder="Drag a text file here to open it, or just start typing!" />
    </Slate>
  )
}

export { App as TranscriptEditor }
