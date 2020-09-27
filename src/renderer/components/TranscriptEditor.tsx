import {
  heresTheTranscript,
  userHasChosenTranscriptFile,
} from "../../common/ipcChannelNames"

import { ipcRenderer } from "electron"
import React, { useCallback, useMemo, useState, useEffect } from "react"
import { deserializeTranscript, serializeTranscript } from "../serialization"
import { createEditor, Node } from "slate"
import { Slate, Editable, withReact } from "slate-react"

// eslint-disable-next-line

const initialTranscriptValue: Node[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
]

// function loadTranscriptFromFile(transcript: string): Node[] {
//   return deserializeTranscript(transcript)
// }

function TranscriptEditor(): JSX.Element {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState<Node[]>(initialTranscriptValue)
  const renderElement = useCallback(({ attributes, children, element }) => {
    switch (element.type) {
      case "episodeTitle":
        return <h1 {...attributes}>{children}</h1>
      case "quote":
        return <blockquote {...attributes}>{children}</blockquote>
      case "link":
        return (
          <a {...attributes} href={element.url}>
            {children}
          </a>
        )
      default:
        return <p {...attributes}>{children}</p>
    }
  }, [])

  // listen for load events; clean up listeners when component will unmount
  useEffect(() => {
    ipcRenderer.on(userHasChosenTranscriptFile, (event, transcript) => {
      const newValue = deserializeTranscript(transcript)
      setValue(newValue)
    })

    return function cleanup(): void {
      ipcRenderer.removeAllListeners(userHasChosenTranscriptFile)
    }
  })

  return (
    <Slate
      id="editor"
      editor={editor}
      value={value}
      onChange={(value): void => {
        console.log("new value is", value)
        setValue(value)
        ipcRenderer.send(heresTheTranscript, serializeTranscript(value))
      }}
    >
      <Editable
        placeholder="Drag a text file here to open it, or just start typing!"
        renderElement={renderElement}
      />
    </Slate>
  )
}

export { TranscriptEditor }
