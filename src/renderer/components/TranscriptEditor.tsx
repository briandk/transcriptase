import {
  heresTheTranscript,
  userHasChosenTranscriptFile,
} from "../../common/ipcChannelNames"

import { css } from "emotion"
import { ipcRenderer } from "electron"
import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  ReactElement,
} from "react"
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
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
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
        renderLeaf={renderLeaf}
      />
    </Slate>
  )
}

const Leaf = ({ attributes, children, leaf }: any): ReactElement => {
  return (
    <span
      {...attributes}
      className={css`
        font-weight: ${leaf.bold && "bold"};
        font-style: ${leaf.italic && "italic"};
        text-decoration: ${leaf.underlined && "underline"};
        ${
          leaf.title &&
          css`
            display: inline-block;
            font-weight: bold;
            font-size: 20px;
            margin: 20px 0 10px 0;
          `
        }
        ${
          leaf.list &&
          css`
            padding-left: 10px;
            font-size: 20px;
            line-height: 10px;
          `
        }
        ${
          leaf.hr &&
          css`
            display: block;
            text-align: center;
            border-bottom: 2px solid #ddd;
          `
        }
        ${
          leaf.blockquote &&
          css`
            display: inline-block;
            border-left: 2px solid #ddd;
            padding-left: 10px;
            color: #aaa;
            font-style: italic;
          `
        }
        ${
          leaf.code &&
          css`
            font-family: monospace;
            padding: 3px;
          `
        }
      `}
    >
      {children}
    </span>
  )
}

export { TranscriptEditor }
