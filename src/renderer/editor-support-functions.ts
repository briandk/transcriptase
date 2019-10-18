import React, { MutableRefObject, RefObject } from "react"
import Plain from "slate-plain-serializer"

import { ipcRenderer } from "electron"
import { Duration } from "luxon"
import { Value } from "slate"

import { getAppState, setAppState } from "../common/appState"
import {
  userHasChosenTranscriptFile,
  heresTheTranscript,
} from "../common/ipcChannelNames"

interface MarkdownPreviewEditorState {
  value: Value
  classNames: string
}

export const writeTranscriptToLocalStorage = (transcript: string): void => {
  localStorage.setItem("transcript", transcript)
}

export const getTranscriptFromLocalStorage = (): string => {
  return localStorage.getItem("transcript")
}

export const handleLoadingTranscriptFromFile = (
  setState: (transcript: Value) => void,
): void => {
  ipcRenderer.on(
    userHasChosenTranscriptFile,
    (event: Event, transcript: string): void => {
      setState(Plain.deserialize(transcript))
    },
  )
}

export const setUpComponent = (setState: () => void): void => {
  handleLoadingTranscriptFromFile(setState)
  listenForInsertCurrentTimestamp()
}

export const MarkdownPreviewEditor = (props: any): any => {
  const editorRef = React.useRef()
  return 0
}

export class MarkdownPreviewEditor extends React.Component<
  {},
  MarkdownPreviewEditorState
> {
  private editorRef: RefObject<any> = React.createRef()
  public constructor(props: any) {
    super(props)
    const initialTranscriptContents = this.getTranscriptFromLocalStorage() || ""
    this.state = {
      value: Plain.deserialize(initialTranscriptContents) as any,
      classNames: "",
    }
  }

  public componentWillUnmount(): void {
    ipcRenderer.removeListener(
      userHasChosenTranscriptFile,
      this.handleLoadingTranscriptFromFile,
    )
  }
  public handleDragOver(event: DragEvent): void {
    event.dataTransfer.dropEffect = "link"
  }
  public handleDrop(event: DragEvent): void {
    const path = event.dataTransfer.files[0].path
    ipcRenderer.send(getThisTranscriptPlease, path)
  }
  public handleInsertingATimestamp(event: KeyboardEvent, editor: any): void {
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
      editor.insertText(`[${formattedTime}] `)
    }
  }
  public listenForInsertCurrentTimestamp = (ref: any): void => {
    ipcRenderer.on(insertCurrentTime, (): void => {
      const editor: any = this.editorRef.current
      const timeInSeconds = getAppState("currentTime")
      const formattedTime = `[${Duration.fromMillis(
        timeInSeconds * 1000,
      ).toFormat("hh:mm:ss.S")}]`

      editor.insertText(formattedTime)
    })
  }

  public render = function(): any {
    renderEditor()
  }

  public renderDecoration: any = renderDecoration

  public onChange = (change: {
    operations: List<Operation>
    value: any
  }): void => {
    const transcript = Plain.serialize(change.value)
    this.setState({ value: change.value })
    setAppState("transcript", transcript)
    setAppState("safeToQuit", false)
    this.writeTranscriptToLocalStorage(transcript)
    ipcRenderer.send(heresTheTranscript, transcript)
  }
}
