import React from "react"
import Plain from "slate-plain-serializer"
import { Editor } from "slate-react"

const TranscriptEditor = (props: {}) => {
  const placeholderText = `Drag a transcript here, or just type!`
  return (
    <div
      id="editor-container"
      //   className={this.state.classNames}
      //   onDragOver={this.handleDragOver}
      //   onDrop={this.handleDrop}
    >
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
