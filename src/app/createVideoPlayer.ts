import videojs from "video.js"

const playerOptions = {
  controls: true,
  autoplay: false,
  fluid: true,
  playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
}

export function createVideoPlayer() {
  const videoElement = document.getElementById("video-player")
  const player = videojs(videoElement, playerOptions)

  return player
}
