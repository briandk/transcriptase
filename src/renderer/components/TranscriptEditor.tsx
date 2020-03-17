import PrismMarkdown from "../prism-markdown/prism-markdown"
import React, { useState, useCallback, useMemo } from "react"
import { Slate, Editable, withReact } from "slate-react"
import { Text, createEditor } from "slate"
import { withHistory } from "slate-history"
import { css } from "emotion"

PrismMarkdown

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

export const MarkdownPreviewEditor = (): any => {
  const [value, setValue] = useState(initialValue)
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const decorate = useCallback(([node, path]) => {
    const ranges: any[] = []

    if (!Text.isText(node)) {
      return ranges
    }

    interface Subtoken {
      length: number
      content: Token[] | string
    }
    type Token = string | Subtoken
    const getLength = (token: Token): number => {
      if (typeof token === "string") {
        return token.length
      } else if (typeof token.content === "string") {
        return token.content.length
      } else {
        return token.content.reduce(
          (l: number, t: Token) => l + getLength(t),
          0,
        )
      }
    }

    const tokens = PrismMarkdown.tokenize(
      node.text,
      PrismMarkdown.languages.markdown,
    )
    let start = 0

    for (const token of tokens) {
      const length = getLength(token)
      const end = start + length

      if (typeof token !== "string") {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        })
      }

      start = end
    }

    return ranges
  }, [])

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value: any): void => setValue(value)}
    >
      <Editable
        decorate={decorate}
        renderLeaf={renderLeaf}
        placeholder="Write some markdown..."
      />
    </Slate>
  )
}

const Leaf = ({ attributes, children, leaf }: any): any => {
  return (
    <span
      {...attributes}
      className={css`
        font-weight: ${leaf.bold && "bold"};
        font-style: ${leaf.italic && "italic"};
        text-decoration: ${leaf.underlined && "underline"};
        ${leaf.title &&
          css`
            display: inline-block;
            font-weight: bold;
            font-size: 20px;
            margin: 20px 0 10px 0;
          `}
        ${leaf.list &&
          css`
            padding-left: 10px;
            font-size: 20px;
            line-height: 10px;
          `}
        ${leaf.hr &&
          css`
            display: block;
            text-align: center;
            border-bottom: 2px solid #ddd;
          `}
        ${leaf.blockquote &&
          css`
            display: inline-block;
            border-left: 2px solid #ddd;
            padding-left: 10px;
            color: #aaa;
            font-style: italic;
          `}
        ${leaf.code &&
          css`
            font-family: monospace;
            background-color: #eee;
            padding: 3px;
          `}
      `}
    >
      {children}
    </span>
  )
}
