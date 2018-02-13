import { Quill } from "quill";

const Inline = Quill.import("blots/inline");
class TimestampBlot extends Inline {}

TimestampBlot.blotName = "timestamp";
TimestampBlot.tagName = "A";
TimestampBlot.className = "timestamp";

export { TimestampBlot };
