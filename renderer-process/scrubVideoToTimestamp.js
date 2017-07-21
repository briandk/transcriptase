const moment = require('moment')

const scrubVideoToTimestamp = function () {
  let player = document.getElementsByTagName('video')[0]
  let timestamp = this.innerHTML
  const timeToGoTo = moment.duration({
    seconds: timestamp.split(':')[1],
    hours: timestamp.split(':')[0]
  }).asSeconds()

  console.log(timestamp)
  console.log(timeToGoTo)

  if (player !== null && player.duration !== null) {
    if (timeToGoTo >= 0 && timeToGoTo <= player.duration) {
      console.log('reached inner condition')
      player.currentTime = timeToGoTo
    }
  }
}

module.exports = scrubVideoToTimestamp
