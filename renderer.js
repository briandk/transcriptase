const registerFileSelectionHandlers = function (clickableElement) {
  const ipc = require('electron').ipcRenderer
  const isMacOS = process.platform === 'darwin'
  let fileSelectionButtons = document.getElementsByClassName('select-file-button')
  
  for (let button of fileSelectionButtons) {
    console.log("iterating button")
    button.addEventListener('click', function (event) {
      ipc.send(isMacOS? 'open-file-dialog-sheet' : 'open-file-dialog')
    })
  }
}

registerFileSelectionHandlers()

