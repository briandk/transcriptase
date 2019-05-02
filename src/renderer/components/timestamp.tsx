import React, { ReactNode } from "react"
import { ipcRenderer } from "electron"
import moment from "moment"
import { scrubVideoToTimecodeMain } from "../../common/ipcChannelNames"

export interface TimestampProps {
  timestamp: string
}

export class Timestamp extends React.Component<TimestampProps, {}> {
  public constructor(props: TimestampProps) {
    super(props)
  }
  public padToHoursMinutesSeconds = (timestamp: string): string => {
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
  public parseTimestampToSeconds = (timestamp: string): number => {
    const paddedTimecode = this.padToHoursMinutesSeconds(timestamp)
    const seconds: number = moment.duration(paddedTimecode).asSeconds()

    return seconds
  }
  public handleClick = (): void => {
    const timeToGoTo = this.parseTimestampToSeconds(this.props.timestamp)
    ipcRenderer.send(scrubVideoToTimecodeMain, timeToGoTo)
  }
  public render(): ReactNode {
    return (
      <a href="#" onClick={this.handleClick} {...this.props}>
        {this.props.children}
      </a>
    )
  }
}
