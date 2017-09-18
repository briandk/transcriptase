const { ipcRenderer } = require('electron')
const toggleMessage = 'User has toggled Play/Pause'

const registerPlayPauseToggleAsGlobalShortcut = function (appWindow, shortcutRegistrationFunction) {
  shortcutRegistrationFunction(appWindow, 'Tab', function () {
    if (appWindow.isFocused()) {
      appWindow.webContents.send(toggleMessage)
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

module.exports = {
  registerPlayPauseToggleAsGlobalShortcut,
  handlePlayPauseToggle
}
