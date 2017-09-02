const { globalShortcut } = require('electron')
const { ipcRenderer } = require('electron')

const toggleMessage = 'User has toggled Play/Pause'

const registerPlayPauseToggleAsGlobalShortcut = function (appWindow) {
  globalShortcut.register('Tab', function () {
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
    event.sender.send('gotcha!')
    console.log(player)
  })
}

module.exports = {
  registerPlayPauseToggleAsGlobalShortcut,
  handlePlayPauseToggle
}
