const videojs = require('video.js')
const playerOptions = {
  'controls': true,
  'autoplay': false,
  'fluid': true,
  'playbackRates': [0.5, 0.75, 1, 1.25, 1.5, 2]
}

const createVideoPlayer = function () {
  let videoElement = document.getElementById('video-player')
  let player = videojs(videoElement, playerOptions)

  return (player)
}

module.exports = createVideoPlayer
