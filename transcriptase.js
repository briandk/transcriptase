let transcriptase = {
  registerOnClickHandlers () {
    document.getElementById('select-video-file')
      .addEventListener('click', () => { console.log('load video') })
  }
}

transcriptase.registerOnClickHandlers()
