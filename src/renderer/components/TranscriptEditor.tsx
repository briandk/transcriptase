import React, { useMemo, useState } from "react"
import { createEditor, Node } from "slate"
import { Slate, Editable, withReact } from "slate-react"

function App(): JSX.Element {
  const editor = useMemo(() => withReact(createEditor()), [])
  // Add the initial value when setting up our state.
  const [value, setValue] = useState<Node[]>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ])

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
