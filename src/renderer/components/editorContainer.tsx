import { ipcRenderer } from "electron"
import Plain from "slate-plain-serializer"
import { Editor } from "slate-react"
import { Change, Node as SlateNode, Range } from "slate"

import Prism from "prismjs"
import React, { DragEvent } from "react"
import PrismMarkdown from "../prism-markdown/prism-markdown.js"
import {
  userHasChosenTranscriptFile,
  heresTheTranscript,
  getThisTranscriptPlease,
} from "../../common/ipcChannelNames"
import {} from "../index"
import { bracketPattern, decorateTimestamps, Match, matchTimestamps } from "../matchTimestamps"
import { setAppState } from "../../common/appState"
import { ErrorBoundary } from "../components/ErrorBoundary"

/*
 * Add the markdown syntax to Prism.
 */
PrismMarkdown

interface MarkdownPreviewEditorState {
  value: any
  classNames: string
}

export class MarkdownPreviewEditor extends React.Component<{}, MarkdownPreviewEditorState> {
  constructor(props: any) {
    super(props)
    this.state = {
      value: Plain.deserialize(
        "Slate is flexible enough to add **decorators** that can format text based on its content. For example, this editor has **Markdown** preview decorators on it, to make it _dead_ simple to make an editor with built-in Markdown previewing.\n## Try it out!\nTry it out for yourself!",
      ),
      classNames: "",
    }
    this.decorateTimestamps = this.decorateTimestamps.bind(this)
  }

  handleLoadingTranscriptFromFile() {
    ipcRenderer.on(userHasChosenTranscriptFile, (event: Event, transcript: string) => {
      this.setState({ value: Plain.deserialize(transcript) })
    })
  }
  componentDidMount() {
    this.handleLoadingTranscriptFromFile()
  }
  componentWillUnmount() {
    ipcRenderer.removeListener(userHasChosenTranscriptFile, this.handleLoadingTranscriptFromFile)
  }
  handleDragOver(event: DragEvent) {
    event.dataTransfer.dropEffect = "copy"
  }
  handleDrop(event: DragEvent) {
    const path = event.dataTransfer.files[0].path
    ipcRenderer.send(getThisTranscriptPlease, path)
  }

  render() {
    return (
      <div
        id="editor-container"
        className={this.state.classNames}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <ErrorBoundary>
          <Editor
            placeholder="Write some markdown..."
            value={this.state.value}
            onChange={this.onChange}
            renderMark={this.renderMark}
            decorateNode={this.decorateNode as any}
            className={"editor"}
          />
        </ErrorBoundary>
      </div>
    )
  }

  renderMark = (props: any) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>
      case "code":
        return <code {...attributes}>{children}</code>
      case "italic":
        return <em {...attributes}>{children}</em>
      case "underlined":
        return <u {...attributes}>{children}</u>
      case "title": {
        return (
          <span
            {...attributes}
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              margin: "20px 0 10px 0",
              display: "inline-block",
            }}
          >
            {children}
          </span>
        )
      }
      case "punctuation": {
        return (
          <span {...attributes} style={{ opacity: 0.2 }}>
            {children}
          </span>
        )
      }
      case "list": {
        return (
          <span
            {...attributes}
            style={{
              paddingLeft: "10px",
              lineHeight: "10px",
              fontSize: "20px",
            }}
          >
            {children}
          </span>
        )
      }
      case "hr": {
        return (
          <span
            {...attributes}
            style={{
              borderBottom: "2px solid #000",
              display: "block",
              opacity: 0.2,
            }}
          >
            {children}
          </span>
        )
      }
      case "timestamp": {
        return (
          <a
            {...attributes}
            onClick={() => {
              console.log("This is a timestamp!")
            }}
          />
        )
      }
      default:
        return null
    }
  }
  onChange: (change: Change) => void = (change: Change) => {
    const value = change.value
    this.setState({ value })
    setAppState("transcript", Plain.serialize(value))
    ipcRenderer.send(heresTheTranscript, Plain.serialize(value))
  }

  decorateTimestamps = (node: SlateNode, document: any): Range[] => {
    // console.log("text is ", node)
    const { key, text } = node
    const decorations: Range[] = []
    const timestamps = matchTimestamps(text, bracketPattern)
    timestamps.forEach((m: Match) => {
      console.log("match is ", m.match)
      const decoration = document.createRange({
        anchor: {
          key: key,
          offset: m.index,
        },
        focus: {
          key: key,
          offset: m.index + m.length + 1,
        },
        marks: [{ type: "timestamp" }],
        isAtomic: true,
      })
      decorations.push(decoration)
    })
    // console.log("parts are ", parts

    return decorations
  }

  decorateNode(node: SlateNode): Range[] {
    if (node.object != "block") return []

    const string = node.text
    const texts = node.getTexts().toArray()
    const grammar = Prism.languages.markdown
    const tokens = Prism.tokenize(string, grammar)
    const markdownDecorations = []
    let startText = texts.shift()
    let endText = startText
    let startOffset = 0
    let endOffset = 0
    let start = 0

    function getLength(token: any) {
      if (typeof token == "string") {
        return token.length
      } else if (typeof token.content! == "string") {
        return token.content.length
      } else {
        return token.content.reduce(
          (l: Prism.Token | string, t: Prism.Token | string) => l + getLength(t),
          0,
        )
      }
    }

    for (const token of tokens) {
      startText = endText
      startOffset = endOffset

      const length = getLength(token)
      const end = start + length

      let available = startText.text.length - startOffset
      let remaining = length

      endOffset = startOffset + remaining

      while (available < remaining) {
        endText = texts.shift()
        remaining = length - available
        available = endText.text.length
        endOffset = remaining
      }

      if (typeof token != "string") {
        const range = {
          anchorKey: startText.key,
          anchorOffset: startOffset,
          focusKey: endText.key,
          focusOffset: endOffset,
          marks: [{ type: token.type }],
        }
        markdownDecorations.push(range)
      }
      start = end
    }
    console.log("This is ", this)
    const timestampDecorations = decorateTimestamps(node, this.value.document)

    // return [...markdownDecorations, ...timestampDecorations] as any
    return markdownDecorations as any
  }
}
