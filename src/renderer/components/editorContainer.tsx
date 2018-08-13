import { ipcRenderer } from "electron"
import Plain from "slate-plain-serializer"
import { Editor } from "slate-react"
import { Change, Node as SlateNode, Value } from "slate"
import React, { DragEvent } from "react"
import { Duration } from "luxon"
import {
  userHasChosenTranscriptFile,
  heresTheTranscript,
  getThisTranscriptPlease,
} from "../../common/ipcChannelNames"
import { setAppState } from "../../common/appState"
import { decorateTimestamps } from "../matchTimestamps"
import { Timestamp } from "../components/timestamp"

// /**
//  * Add the markdown syntax to Prism.
//  */
// PrismMarkdown

interface MarkdownPreviewEditorState {
  value: Value
  classNames: string
}

export class MarkdownPreviewEditor extends React.Component<{}, MarkdownPreviewEditorState> {
  constructor(props: any) {
    super(props)
    this.state = {
      value: Plain.deserialize(
        "This is a timestamp: [00:44], and this is another timestamp example: [2:38]",
      ),
      classNames: "",
    }
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
  handleInsertingATimestamp(event: any, change: Change) {
    const command = event.metaKey
    const control = event.ctrlKey
    const semicolon = event.key === ";"
    const player: HTMLVideoElement = document.getElementById("media-player") as HTMLVideoElement
    const timeInSeconds = player.currentTime
    const formattedTime = Duration.fromMillis(timeInSeconds * 1000).toFormat("hh:mm:ss.S")

    const correctCombination = (semicolon && command) || (semicolon && control)
    if (!correctCombination) {
      return
    } else {
      change.insertText(`[${formattedTime}]`)

      console.log(Duration.fromMillis(timeInSeconds * 1000).toFormat("hh:mm:ss.S"))
    }
  }
  render() {
    return (
      <div
        id="editor-container"
        className={this.state.classNames}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <Editor
          placeholder="Write some markdown..."
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.handleInsertingATimestamp}
          renderMark={this.renderMark}
          decorateNode={this.decorateNode as any}
          className={"editor"}
        />
      </div>
    )
  }

  renderMark = (props: any) => {
    const { mark, text } = props

    switch (mark.type) {
      case "timestamp":
        return <Timestamp timestamp={text} {...props} />
      default:
        return { ...props }
    }
  }

  onChange: (value: Change) => void = ({ value }) => {
    this.setState({ value })
    setAppState("transcript", Plain.serialize(value))
    ipcRenderer.send(heresTheTranscript, Plain.serialize(value))
  }

  decorateNode(node: SlateNode, context = this): Range[] {
    if (node.object === "document") return []
    console.log(node)
    return decorateTimestamps(node)
  }
}
