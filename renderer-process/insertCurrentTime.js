const moment = require('moment')
require('moment-duration-format')

const formatDuration = function (duration) {
  const formattedTime = `${duration.get('minutes')}:${duration.get('seconds')}`
  return formattedTime
}

const getCurrentTime = function () {
  const player = document.getElementsByTagName('video')[0]
  const duration = moment.duration(player.currentTime())
  const formattedTime = formatDuration(duration)
  return formattedTime
}

module.exports = { formatDuration, getCurrentTime }
