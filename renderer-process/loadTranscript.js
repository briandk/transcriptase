const fs = require('fs-plus')
const ipc = require('electron').ipcMain

const loadTranscript = function (event, filepath, roleofFile, editorInstance) {
  console.log(filepath)
  fs.readFile(
    filepath.toString(),
    'utf-8',
    (err, fileContents) => {
      if (err) console.log(err)
      editorInstance.setText(fileContents)
    }
  )
}


module.exports = loadTranscript
