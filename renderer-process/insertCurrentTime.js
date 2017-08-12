const { app, globalShortcut } = require('electron')
const moment = require('moment')
const editor = require('./transcriptEditor')
const { ipcRenderer } = require('electron')
require('moment-duration-format')

const getCurrentTime = function () {
  const player = document.getElementsByTagName('video')[0]
  const currentTime = moment
    .duration(player.currentTime, 'seconds')
    .format({
      template: 'hh:mm:ss',
      precision: 2, // how many decimal places to show
      trim: false
    })
  const formattedTimestamp = `[${currentTime}] `
  return (formattedTimestamp)
}

const insertCurrentTimestamp = function () {
  const cursorPosition = editor.getSelection(focus = true).index
  const timeStamp = getCurrentTime()
  const cursorPositionAfterInsert = cursorPosition + timeStamp.length
  editor.insertText(cursorPosition, timeStamp, 'user')
  editor.setSelection(cursorPositionAfterInsert, 0, 'user')
}

const listenForInsertCurrentTimestampEvents = function () {
  ipcRenderer.on('insert-current-time', function () {
    insertCurrentTimestamp()
  })
}

const registerClickHandlerForTimestampButton = function () {
  const timestampButton = document.querySelector('#timestamp-button')
  timestampButton.addEventListener(
    'click',
    function () { insertCurrentTimestamp() }
  )
}

module.exports = {
  listenForInsertCurrentTimestampEvents,
  registerClickHandlerForTimestampButton
}
