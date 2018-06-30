import Dropzone from "react-dropzone"
import { DropzoneProps } from "react-dropzone"
import React from "react"

export class Basic extends React.Component<DropzoneProps> {
  constructor(props: DropzoneProps) {
    super(props)

    interface DropzoneState {
      files: File[]
    }

    let state: DropzoneState = { files: [] }
    this.state = state
  }

  onDrop: (files: File[]) => void = (files: File[]) => {
    console.log(files)
    this.setState({
      files,
    })
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {this.state.files.map(f => (
              <li key={f.name}>
                {f.name} - {f.size} bytes
              </li>
            ))}
          </ul>
        </aside>
      </section>
    )
  }
}

<Basic />
