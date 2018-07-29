import Plain from "slate-plain-serializer"
import { Editor } from "slate-react"
import { Change, Node as SlateNode } from "slate"

import Prism from "prismjs"
import React from "react"
import PrismMarkdown from "../prism-markdown/prism-markdown.js"

/**
 * Add the markdown syntax to Prism.
 */
PrismMarkdown

/**
 * The markdown preview example.
 *
 * @type {Component}
 */

export class MarkdownPreviewEditor extends React.Component {
  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  state = {
    value: Plain.deserialize(
      "Slate is flexible enough to add **decorators** that can format text based on its content. For example, this editor has **Markdown** preview decorators on it, to make it _dead_ simple to make an editor with built-in Markdown previewing.\n## Try it out!\nTry it out for yourself!",
    ),
  }

  /**
   *
   * Render the example.
   *
   * @return {Component} component
   */

  render() {
    return (
      <Editor
        placeholder="Write some markdown..."
        value={this.state.value}
        onChange={this.onChange}
        renderMark={this.renderMark}
        decorateNode={this.decorateNode as any}
      />
    )
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

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
      default:
        return null
    }
  }

  /**
   * On change.
   *
   * @param {Change} change
   */

  onChange: (value: Change) => void = ({ value }) => {
    this.setState({ value })
  }

  /**
   * Define a decorator for markdown styles.
   *
   * @param {Node} node
   * @return {Array}
   */

  decorateNode(node: SlateNode) {
    if (node.object != "block") return []

    const string = node.text
    const texts = node.getTexts().toArray()
    const grammar = Prism.languages.markdown
    const tokens = Prism.tokenize(string, grammar)
    const decorations = []
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
        console.log("The else branch of getLength() was called with token: ", token)
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

        decorations.push(range)
      }

      start = end
    }

    return decorations
  }
}

/**
 * Export.
 */
