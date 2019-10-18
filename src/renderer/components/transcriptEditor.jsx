import React, { useRef } from "react"
import { Editor } from "slate-react"

export const TranscriptEditor = props => {
  const editorRef = React.useRef()
  const placeholderText = `Drag a transcript here, or just type!`

  return (
    <div
      id="editor-container"
      onDragOver={this.handleDragOver}
      onDrop={this.handleDrop}
    >
      <Editor
        // placeholder={placeholderText}
        // value={this.state.value}
        // ref={this.editorRef}
        // onChange={this.onChange}
        // renderDecoration={this.renderDecoration}
        // decorateNode={decorateNode}
        className={"editor"}
      />
    </div>
  )
}
