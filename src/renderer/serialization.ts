import { Node } from "slate"

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

export function serializeTranscript(value: Node[]): string {
  return value.join("\n\n")
}
