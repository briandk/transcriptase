// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const ipc = require('electron').ipcRenderer
let selectVideoButton = document.getElementById('select-video-file')

// selectVideoButton.addEventListener('click', function (event) {
// console.log("sending message!")
//   ipc.send('open-file-dialog')
// })

selectVideoButton.onclick = function (event) {console.log("hooray!")};

ipc.on('selected-directory', function (event, path) {
  document.getElementById('selected-file').innerHTML = `You selected: ${path}`
})