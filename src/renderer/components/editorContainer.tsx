import { Event as ElectronEvent, ipcRenderer } from "electron"
import Plain from "slate-plain-serializer"
import { Editor } from "slate-react"
import { Change, Value } from "slate"
import React, { DragEvent, RefObject } from "react"
import { Duration } from "luxon"
import {
  userHasChosenTranscriptFile,
  heresTheTranscript,
  getThisTranscriptPlease,
  insertCurrentTime,
} from "../../common/ipcChannelNames"
import { setAppState, getAppState } from "../../common/appState"

import { Timestamp } from "../components/timestamp"
import PrismMarkdown from "../prism-markdown/prism-markdown"
import { decorateMarkdown } from "../decorateMarkdown"

/**
 * Add the markdown syntax to Prism.
 */
PrismMarkdown

interface MarkdownPreviewEditorState {
  value: Value
  classNames: string
}

export class MarkdownPreviewEditor extends React.Component<
  {},
  MarkdownPreviewEditorState
> {
  private editorRef: RefObject<Editor> = React.createRef()
  public constructor(props: {}) {
    super(props)
    const initialTranscriptContents = this.getTranscriptFromLocalStorage() || ""
    this.state = {
      value: Plain.deserialize(initialTranscriptContents),
      classNames: "",
    }
  }
  private writeTranscriptToLocalStorage(transcript: string): void {
    localStorage.setItem("transcript", transcript)
  }

  private getTranscriptFromLocalStorage(): string {
    return localStorage.getItem("transcript")
  }

  private handleLoadingTranscriptFromFile(): void {
    ipcRenderer.on(
      userHasChosenTranscriptFile,
      (event: Event, transcript: string) => {
        this.setState({ value: Plain.deserialize(transcript) })
      },
    )
  }
  public componentDidMount(): void {
    this.handleLoadingTranscriptFromFile()
    this.listenForInsertCurrentTimestamp()
  }
  public componentWillUnmount(): void {
    ipcRenderer.removeListener(
      userHasChosenTranscriptFile,
      this.handleLoadingTranscriptFromFile,
    )
  }
  private handleDragOver(event: DragEvent) {
    event.dataTransfer.dropEffect = "link"
  }
  private handleDrop(event: DragEvent) {
    const path = event.dataTransfer.files[0].path
    ipcRenderer.send(getThisTranscriptPlease, path)
  }
  handleInsertingATimestamp(, change: Change) {
    const command = event.metaKey
    const control = event.ctrlKey
    const semicolon = event.key === ";"
    const player: HTMLVideoElement = document.getElementById(
      "media-player",
    ) as HTMLVideoElement
    const timeInSeconds = player.currentTime
    const formattedTime = Duration.fromMillis(timeInSeconds * 1000)
      .toFormat("hh:mm:ss.S")
      .toString()

    const correctCombination = (semicolon && command) || (semicolon && control)
    if (!correctCombination) {
      return
    } else {
      change.insertText(`[${formattedTime}] `)
      // change.insertText
    }
  }
  listenForInsertCurrentTimestamp = () => {
    ipcRenderer.on(insertCurrentTime, (event: ElectronEvent) => {
      const editor: Editor = this.editorRef.current
      const timeInSeconds = getAppState("currentTime")
      const formattedTime = `[${Duration.fromMillis(
        timeInSeconds * 1000,
      ).toFormat("hh:mm:ss.S")}] `

      editor.change((change: Change) => change.insertText(formattedTime))
    })
  }

  render() {
    const placeholderText = `Drag a transcript here, or just type!`

    return (
      <div
        id="editor-container"
        className={this.state.classNames}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <Editor
          placeholder={placeholderText}
          value={this.state.value}
          onChange={this.onChange}
          onFocus={(event, change) => change.focus()} // workaround for https://github.com/ianstormtaylor/slate/issues/2147
          ref={this.editorRef}
          renderMark={this.renderMark}
          decorateNode={decorateMarkdown as any}
          className={"editor"}
        />
      </div>
    )
  }

  renderMark = (props: any) => {
    const { mark, text, attributes, children } = props

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>
      case "code":
        return <code {...attributes}>{children}</code>
      case "italic":
        return <em {...attributes}>{children}</em>
      case "underlined":
        return <u {...attributes}>{children}</u>
      case "h1": {
        return <h1 {...attributes}>{children}</h1>
      }
      case "h2": {
        return <h2 {...attributes}>{children}</h2>
      }
      case "h3": {
        return <h3 {...attributes}>{children}</h3>
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
      case "timestamp":
        return <Timestamp timestamp={text} {...props} />
      default:
        return { ...props }
    }
  }

  onChange: (change: Change) => void = change => {
    const transcript = Plain.serialize(change.value)
    this.setState({ value: change.value })
    setAppState("transcript", transcript)
    setAppState("safeToQuit", false)
    this.writeTranscriptToLocalStorage(transcript)
    ipcRenderer.send(heresTheTranscript, Plain.serialize(change.value))
  }
}
