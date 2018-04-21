// import { saveFile } from "../main/saveTranscript";
// import { dialog } from "electron";
// import { BrowserWindow } from "electron";

// export function showUnsavedChangesDialog(
//   appWindow: BrowserWindow,
//   transcriptText: string,
//   lastSavedPath: string,
// ) {
//   dialog.showMessageBox(
//     appWindow,
//     {
//       message:
//         "It looks like you have unsaved changes. What would you like to do?",
//       buttons: [
//         "Save Transcript and Close",
//         "Continue Editing",
//         "Close Without Saving",
//       ],
//       defaultId: 0,
//     },
//     (response: number): void | boolean => {
//       if (response === 2) {
//         appWindow.destroy();
//       } else if (response === 1) {
//         return false;
//       } else if (response === 0) {
//         saveFile(transcriptText, lastSavedPath, appWindow, true);
//       }
//     },
//   );
// }
