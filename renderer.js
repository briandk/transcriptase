// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const registerFileSelectionHandlers = function (clickableElement) {
  const ipc = require('electron').ipcRenderer
  let fileSelectionButtons = document.getElementsByClassName('select-file-button')
  let button
  for (button of fileSelectionButtons) {
    console.log("iterating button")
    button.addEventListener('click', function (event) {
      ipc.send('open-file-dialog')
    })
  }
}

registerFileSelectionHandlers()

