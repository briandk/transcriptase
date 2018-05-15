import Quill from "quill";
import { DeltaStatic } from "quill";
import { ipcRenderer as ipc } from "electron";

export function emitTranscriptOnTextChange(editor: Quill): void {
  const transcriptText = editor.getText();
  editor.on(
    "text-change",
    (change: DeltaStatic, oldContents: DeltaStatic, source: string) => {
      ipc.send("emit-transcript-as-text", transcriptText);
      localStorage.setItem("transcript-text", transcriptText);
    },
  );
}

//     TO emit editor contents on text change:
//             REGISTER an on-change event with Quill:
//                 WHEN the text changes:
//                     SEND an ipc message with the editor's contents
//                     WRITE the editor contents to localstorage

//     TO write editor contents to localstorage:
