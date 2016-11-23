let transcriptase = {
  registerFileSelectionHandlers (clickableElement) {
    let fileSelectionButtons = document.getElementsByClassName('select-file-button')
    let button
    for (button of fileSelectionButtons) {
      button.addEventListener('click', () => { console.log("loading video!")})
    }
  }
}

transcriptase.registerFileSelectionHandlers()
