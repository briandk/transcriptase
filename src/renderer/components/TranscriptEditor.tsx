import { ipcRenderer } from "electron"
import { List } from "immutable"
import React, { useState } from "react"
import { Value, Operation } from "slate"
import Plain from "slate-plain-serializer"
import { Editor } from "slate-react"

import { getAppState, setAppState } from "../../common/appState"
import {
  getThisTranscriptPlease,
  heresTheTranscript,
} from "../../common/ipcChannelNames"

const handleDragOver = (event: any): void => {
  event.dataTransfer.dropEffect = "link"
}

const handleDrop = (event: any): void => {
  const path = event.dataTransfer.files[0].path
  ipcRenderer.send(getThisTranscriptPlease, path)
}

const writeTranscriptToLocalStorage = (transcript: string): void => {
  localStorage.setItem("transcript", transcript)
}

const TranscriptEditor = (props: {}) => {
  const placeholderText = `Drag a transcript here, or just type!`
  const [transcriptValue, setTranscriptValue] = useState(placeholderText)
  return (
    <div id="editor-card" onDragOver={handleDragOver} onDrop={handleDrop}>
      <Editor
        placeholder={placeholderText}
        value={Plain.deserialize(transcriptValue)}
        // ref={this.editorRef}
        onChange={(change: { operations: any; value: any }): void => {
          const transcript = Plain.serialize(change.value)
          if (change.value) {
            setTranscriptValue(change.value)
          }
          // setAppState("transcript", transcript)
          // setAppState("safeToQuit", false)
          // writeTranscriptToLocalStorage(transcript)
          // ipcRenderer.send(heresTheTranscript, Plain.serialize(change.value))
        }}
        //   renderDecoration={this.renderDecoration as any}
        //   decorateNode={decorateNode as any}
      />
    </div>
  )
}

export { TranscriptEditor }
