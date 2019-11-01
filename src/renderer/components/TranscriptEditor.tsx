import { ipcRenderer } from "electron"
import React from "react"
import Plain from "slate-plain-serializer"
import { Editor } from "slate-react"

import { getThisTranscriptPlease } from "../../common/ipcChannelNames"

function handleDragOver(event: any): void {
  event.dataTransfer.dropEffect = "link"
}

function handleDrop(event: any): void {
  const path = event.dataTransfer.files[0].path
  ipcRenderer.send(getThisTranscriptPlease, path)
}

const TranscriptEditor = (props: {}) => {
  const placeholderText = `Drag a transcript here, or just type!`
  return (
    <div id="editor-card" onDragOver={handleDragOver} onDrop={handleDrop}>
      <Editor
        placeholder={placeholderText}
        value={Plain.deserialize(placeholderText)}
        // ref={this.editorRef}
        //   onChange={this.onChange as any}
        //   renderDecoration={this.renderDecoration as any}
        //   decorateNode={decorateNode as any}
      />
    </div>
  )
}

export { TranscriptEditor }
