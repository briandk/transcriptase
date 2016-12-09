const fs = require('fs-plus')

const handleFileSelection = function (event, filepath, roleOfFile, editorInstance) {
  const path = filepath.toString()

  if (roleOfFile === 'transcript') {
    fs.readFile(
      path,
      'utf-8',
      (err, fileContents) => {
        if (err) console.log(err)
        editorInstance.setText(fileContents)
      })
  }
}

module.exports = handleFileSelection
