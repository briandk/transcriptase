import React, { useMemo, useState } from "react"
import { createEditor, Node } from "slate"
import { Slate, Editable, withReact } from "slate-react"

const App = (): JSX.Element => {
  const editor = useMemo(() => withReact(createEditor()), [])
  // Add the initial value when setting up our state.
  const [value, setValue] = useState<Node[]>([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value): void => setValue(value)}
    >
      <Editable />
    </Slate>
  )
}

export { App as TranscriptEditor }
