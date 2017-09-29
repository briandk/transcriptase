const { ipcRenderer } = require('electron')
const moment = require('moment')

const toggleMessage = 'User has toggled Play/Pause'
const jumpBackwardsMessage = 'User wants to rewind'

const registerPlayPauseToggleAsGlobalShortcut = function (appWindow, shortcutRegistrationFunction) {
  shortcutRegistrationFunction(appWindow, 'Tab', function () {
    if (appWindow.isFocused()) {
      appWindow.webContents.send(toggleMessage)
    }
  })
}

const registerJumpBackNSeconds = function (appWindow, shortcutRegistrationFunction) {
  shortcutRegistrationFunction(appWindow, 'Shift+Tab', function () {
    if (appWindow.isFocused()) {
      appWindow.webContents.send(jumpBackwardsMessage)
    }
  })
}

const handlePlayPauseToggle = function (player) {
  ipcRenderer.on(toggleMessage, function (event) {
    if (player.paused() === false) {
      player.pause()
    } else {
      player.play()
    }
  })
}

const getTimeToRewindTo = function (player) {
  const currentTime = moment.duration(player.currentTime(), 'seconds')
  const rewindAmount = moment.duration(3, 'seconds')
  let soughtTime = currentTime.subtract(rewindAmount).asSeconds()
  if (soughtTime < 0) {
    soughtTime = 0
  }
  return (soughtTime)
}

const handleJumpingBackNSeconds = function (player) {
  ipcRenderer.on(jumpBackwardsMessage, function (event) {
    player.currentTime(
      getTimeToRewindTo(player)
    )
  })
}

module.exports = {
  registerPlayPauseToggleAsGlobalShortcut,
  handlePlayPauseToggle,
  registerJumpBackNSeconds,
  handleJumpingBackNSeconds
}
