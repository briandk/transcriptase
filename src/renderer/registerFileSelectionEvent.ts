import { ipcRenderer as ipc } from "electron";

export function registerFileSelectionEvent() {
  const transcriptSelectionButton = document.getElementById(
    "select-transcript-file",
  );
  const mediaSelectionButton = document.getElementById("select-media-file");

  transcriptSelectionButton!.addEventListener("click", () => {
    ipc.send("open-file-dialog", "transcript");
  });
  mediaSelectionButton!.addEventListener("click", () => {
    ipc.send("open-file-dialog", "video");
  });
}
