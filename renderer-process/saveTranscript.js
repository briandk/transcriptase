const ipc = require('electron').ipcRenderer
// const saveOptions = {
//   title: 'Save Your Transcript'
// }

const handleSaveEvents = function (transcriptText, pathToTranscriptFile) {
  let saveTranscriptButton = document.querySelector('.save-transcript')
  let saveAsButton = document.querySelector('.save-transcript-as')

  saveTranscriptButton.addEventListener('click', function (event) {
    ipc.send(
      'save-transcript',
      transcriptText,
      pathToTranscriptFile
    )
  })
  saveAsButton.addEventListener('click', function (event) {
    ipc.send('save-transcript-as')
  })
}

module.exports = {
  handleSaveEvents
}

// When "save is clicked"
//   save the Transcript
//
// TO save the transcript
//   get Transcript
//   write it to disk
//
// To write it to disk
//   get path to write to
//   fs.writeFile to that path
//
// To get path to write to
//   IF the save path is already set
//     use that
//   ELSE
//     ask the user for a path
