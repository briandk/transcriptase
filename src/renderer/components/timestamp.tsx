import React from "react"
import { ipcRenderer } from "electron"
import { scrubVideoToTimecode } from "../../common/ipcChannelNames"

interface TimestampProps extends React.ReactPropTypes {
  attributes: any
  children: any
  timecode: string
}

export class Timestamp extends React.Component<TimestampProps, {}> {
  constructor(props: any) {
    super(props)
    console.log("Props are", this.props)
    console.log("padded timestamp is", this.padToHoursMinutesSeconds(this.props.timecode))
  }

  padToHoursMinutesSeconds = (timestamp: string): string => {
    const unbracketedTimecode = timestamp.trim().slice(1, timestamp.length - 1)
    const shortTimecodePattern = /\[(\d+:[\.\d]+)\]/
    const paddedTimestamp = `[00:${unbracketedTimecode}]`
    console.log(`raw timestamp is${timestamp}`)
    console.log(`raw timecode is${unbracketedTimecode}`)

    if (shortTimecodePattern.test(timestamp)) {
      console.log("returning padded timestamp!", paddedTimestamp)
      return paddedTimestamp
    } else {
      return timestamp
    }
  }
  formatTimestampForScrubbing = () => {}
  handleClick = (event: any) => {
    event.preventDefault()
    console.log("A timestamp was clicked!")
    const timeToGoTo = this.padToHoursMinutesSeconds(this.props.timecode)
    ipcRenderer.send(scrubVideoToTimecode, timeToGoTo)
  }
  render() {
    return (
      <a href="#" onClick={this.handleClick} {...this.props}>
        {this.props.children}
      </a>
    )
  }
}
