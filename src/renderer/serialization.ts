import { Node, Text } from "slate"

export function deserializeTranscript(transcript: string): Node[] {
  const value = transcript.split("\n\n").map((s) => {
    return {
      type: "paragraph",
      children: [{ text: s }],
    }
  })
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
      return `${children}`
    case "paragraph":
      return `${children}`
    case "link":
      return `${children}`
    default:
      return children
  }
}

export function serializeTranscript(value: Node[]): string {
  const serializedTranscript = value.map((v) => serialize(v)).join("\n")
  return serializedTranscript
}
