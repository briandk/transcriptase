import React, { useState, useMemo } from "react"
// import { Slate, Editable, withReact } from "slate-react"
// import { createEditor} from "slate"

const initialValue = [
  {
    children: [
      {
        text:
          "Slate is flexible enough to add **decorations** that can format text based on its content. For example, this editor has **Markdown** preview decorations on it, to make it _dead_ simple to make an editor with built-in Markdown previewing.",
      },
    ],
  },
  {
    children: [{ text: "## Try it out!" }],
  },
  {
    children: [{ text: "Try it out for yourself!" }],
  },
]

const MarkdownPreviewEditor = (): any => {
  // const editor = useMemo(() => withReact(createEditor()), [])
  // const [value, setValue] = useState(initialValue)

  // return (
  //   <Slate
  //     editor={editor}
  //     value={value}
  //     onChange={(value: any): void => setValue(value)}
  //   >
  //     <Editable></Editable>
  //   </Slate>
  // )
  return <h1>Hello, World!</h1>
}

export { MarkdownPreviewEditor }
