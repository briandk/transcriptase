import { Node, Text } from "slate"

export function deserializeTranscript(transcript: string): Node[] {
  const value = transcript.split("\n").map((s) => {
    return {
      type: "paragraph",
      children: [{ text: s }],
    }
  })
  console.log("transcript is", value)
  return value
}

// From the slate Docs: https://docs.slatejs.org/concepts/09-serializing#html
const serialize = (node: Node): any => {
  if (Text.isText(node)) {
    return node.text
  }

  const children: any = node.children.map((n) => serialize(n)).join("")

  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`
    case "paragraph":
      return `<p>${children}</p>`
    case "link":
      return `<a href="${node.url}">${children}</a>`
    default:
      return children
  }
}

export function serializeTranscript(value: Node[]): string {
  const serializedTranscript = value.map((v) => serialize(v)).join("\n\n")
  console.log("The serialized transcript is", serializedTranscript)
  return serializedTranscript
  //   return value.map((v) => serialize(v)).join("\n\n")
}
