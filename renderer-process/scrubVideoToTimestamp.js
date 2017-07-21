const moment = require('moment')

const scrubVideoToTimestamp = function () {
  let player = document.querySelector('.video-js')
  const timeToGoTo = moment.duration(this.innerHTML).asSeconds()
  console.log(this.innerHTML)
  console.log(player)

  if (player !== null && player.duration) {
    if (timeToGoTo >= 0 && timeToGoTo <= player.duration()) {
      player.currentTime(timeToGoTo)
    }
  }
}

module.exports = scrubVideoToTimestamp
