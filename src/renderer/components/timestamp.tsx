import React from "react"
import { ipcRenderer } from "electron"
import moment from "moment"
import { scrubVideoToTimecodeMain } from "../../common/ipcChannelNames"

interface TimestampProps extends React.ReactPropTypes {
  attributes: any
  children: any
  timestamp: string
}

export class Timestamp extends React.Component<TimestampProps, {}> {
  constructor(props: any) {
    super(props)
  }
  padToHoursMinutesSeconds = (timestamp: string): string => {
    const unpaddedSeconds = /\[\d{1,2}\.{0,1}\d*\]/
    const unpaddedMinutes = /\[\d{1,2}:\d{1,2}\.{0,1}\d*\]/
    const hoursMinutesSeconds = /\[\d+:\d{1,2}:\d{1,2}\.{0,1}\d*\]/
    const rawTimecode = timestamp.slice(1, timestamp.length - 1) // remove the brackets

    if (unpaddedSeconds.test(timestamp)) {
      return `00:00:${rawTimecode}`
    } else if (unpaddedMinutes.test(timestamp)) {
      return `00:${rawTimecode}`
    } else if (hoursMinutesSeconds.test(timestamp)) {
      return rawTimecode
    } else {
      return null
    }
  }
  parseTimestampToSeconds = (timestamp: string): number => {
    const paddedTimecode = this.padToHoursMinutesSeconds(timestamp)
    const seconds: number = moment.duration(paddedTimecode).asSeconds()

    return seconds
  }
  handleClick = (event: any) => {
    event.preventDefault()
    const timeToGoTo = this.parseTimestampToSeconds(this.props.timestamp)
    ipcRenderer.send(scrubVideoToTimecodeMain, timeToGoTo)
  }
  render() {
    return (
      <a href="#" onClick={this.handleClick} {...this.props}>
        {this.props.children}
      </a>
    )
  }
}
