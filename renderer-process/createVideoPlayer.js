const videojs = require('video.js')
const playerOptions = {
  'controls': true,
  'autoplay': false,
  'fluid': true,
  'playbackRates': [0.5, 0.75, 1, 1.25, 1.5, 2]
}

const createVideoElement = function (container, pathToVideoSource = false) {
  let videoElement = document.createElement('video')
  // remove any existing video elements
  for (let child of container.children) {
    container.removeChild(child)
  }
  container.appendChild(videoElement)
  return (videoElement)
}

const createVideoPlayer = function (videoContainer, pathToVideoSource = false) {
  let video = createVideoElement(videoContainer, pathToVideoSource)
  video.setAttribute('class', 'video-js')
  if (pathToVideoSource) {
    let sourceElement = document.createElement('source')
    sourceElement.setAttribute('src', pathToVideoSource)
    sourceElement.setAttribute('type', 'video/mp4')
    video.appendChild(sourceElement)
  }
  videojs(video, playerOptions)
}

module.exports = createVideoPlayer
