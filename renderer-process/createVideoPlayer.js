const videojs = require('video.js')
const playerOptions = {
  'controls': true,
  'autoplay': false,
  'fluid': true,
  'playbackRates': [0.5, 0.75, 1, 1.25, 1.5, 2]
}

const namespace = {
  createVideoPlayer (videoContainer, pathToVideoSource = false) {
    videojs(
      videoContainer,
      playerOptions
    )
  },

  setVideoSource (sourceElement, videoSource) {
    sourceElement.setAttribute('src', videoSource)
  }
}

module.exports = namespace
