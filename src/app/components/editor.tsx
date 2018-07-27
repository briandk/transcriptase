import Plain from "slate-plain-serializer"
import { Editor } from "slate-react"
import { Change } from "slate"

import React from "react"

/**
 * The plain text example.
 *
 * @type {Component}
 */

export class PlainText extends React.Component {
  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  state = {
    value: Plain.deserialize("This is editable plain text, just like a <textarea>!"),
  }

  /**
   * Render the editor.
   *
   * @return {Component} component
   */

  render() {
    return (
      <Editor
        placeholder="Enter some plain text..."
        value={this.state.value}
        onChange={this.onChange}
      />
    )
  }

  /**
   * On change.
   *
   * @param {Change} change
   */

  onChange: (value: Change) => void = ({ value }) => {
    this.setState({ value })
  }
}

/**
 * Export.
 */
