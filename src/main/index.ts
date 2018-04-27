// import { showUnsavedChangesDialog } from "./main/showUnsavedChangesDialog";
import { registerSaveHandler } from "./saveTranscript";
import { app, BrowserWindow, Event, ipcMain as ipc, Menu } from "electron";
import * as fs from "fs";
import path from "path";
import * as url from "url";
import { template as menuTemplate } from "../menu/menuTemplate";
import { showFileSelectionDialog } from "./showFileSelectionDialog";

const isDevelopment = process.env.NODE_ENV !== "production";

let mainWindow: any;

function createWindow() {
  // Create the browser window.
  const indexFile = path.join(__dirname, "renderer", "index.html");

  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    frame: true,
    title: "Transcriptase",
  });

  if (isDevelopment) {
    mainWindow.webContents.openDevTools();
  }

  if (isDevelopment) {
    mainWindow.loadURL(
      `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`,
    );
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: indexFile,
        protocol: "file:",
        slashes: true,
      }),
    );
  }

  // mainWindow.webContents.openDevTools()   // Open the DevTools.
  registerSaveHandler(mainWindow);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.on("close", (event: Event) => {
    event.preventDefault();
    mainWindow!.webContents.send("user-wants-to-close-the-app");
  });
}

app.on("ready", () => {
  createWindow();

  mainWindow.once("ready-to-show", () => {
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
    mainWindow.show();
  });
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// File selection
ipc.on("open-file-dialog", (event) => {
  const file: string = showFileSelectionDialog(event);
  if (file !== "") {
    event.sender.send("a-file-was-selected", file);
  }
});

ipc.on("read-transcript-from-filepath", (event, filePath) => {
  const transcriptStream = fs.createReadStream(filePath.toString(), {
    encoding: "utf-8",
  });
  let data = "";

  transcriptStream.on("data", (chunk) => {
    data += chunk;
  });
  transcriptStream.on("end", () => {
    event.sender.send(
      "transcript-was-read-from-file",
      data,
      filePath.toString(),
    );
  });

  // fs.readFile(
  //   filePath.toString(),
  //   "utf-8",
  //   (err, data) => {
  //     if (err) console.log(err)
  //     console.log(data)
  //     event.sender.send("transcript-was-read-from-file", data, filePath.toString())
  //   }
  // )
});

// ipc.on(
//   "show-unsaved-changes-dialog",
//   (event, transcriptEditor, lastSavedPath) => {
//     showUnsavedChangesDialog(mainWindow, transcriptEditor, lastSavedPath);
//   },
// );

ipc.on("its-safe-to-close-the-app", () => {
  mainWindow.destroy();
});

// global shortcuts

// app.on("ready", () => {
//   globalShortcut.register("CmdOrCtrl+;", function () {
//     console.log(`inserting `)
//   })
// })