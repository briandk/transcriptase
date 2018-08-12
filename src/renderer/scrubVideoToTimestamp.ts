export const scrubVideoToTimestamp = function(targetTimeInSeconds: number) {
  let player = document.getElementsByTagName("video")[0]
  const timeToGoTo = targetTimeInSeconds
  console.log(timeToGoTo)

  if (player !== null && player.duration !== null) {
    if (timeToGoTo >= 0 && timeToGoTo <= player.duration) {
      console.log("reached inner condition")
      player.currentTime = timeToGoTo
    }
  }
}

module.exports = scrubVideoToTimestamp
