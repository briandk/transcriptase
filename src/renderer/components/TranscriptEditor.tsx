import { userHasChosenTranscriptFile } from "../../common/ipcChannelNames"
import { ipcRenderer, IpcRendererEvent } from "electron"
import React, { useMemo, useState, useEffect } from "react"
import { createEditor, Node } from "slate"
import { Slate, Editable, withReact } from "slate-react"

function loadTranscript(event: IpcRendererEvent): void {
  console.log(event)
}

function subscribeToLoadingTranscript(): void {
  ipcRenderer.on(userHasChosenTranscriptFile, (event) =>
    console.log("I'm subscribed to transcript load events", event),
  )
}

function unsubscribeFromLoadingTranscript(): void {
  ipcRenderer.removeListener(userHasChosenTranscriptFile, loadTranscript)
}

function App(): JSX.Element {
  const editor = useMemo(() => withReact(createEditor()), [])
  // Add the initial value when setting up our state.
  const initialValue: Node[] = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]
  const [value, setValue] = useState<Node[]>(initialValue)
  useEffect(() => {
    ipcRenderer.on(userHasChosenTranscriptFile, loadTranscript)
    return function cleanup(): void {
      unsubscribeFromLoadingTranscript()
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
