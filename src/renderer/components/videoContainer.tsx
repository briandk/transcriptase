import React, { DragEvent } from "react"
import { Event as ElectronEvent, ipcRenderer } from "electron"
// import { PlayerOptions, Source } from "video.js"
// import { VideoPlayer, PlayerOptions } from "./videojs"
import {
  userHasChosenMediaFile,
  userHasToggledPlayPause,
  jumpBackInTime,
  scrubVideoToTimecodeRenderer,
} from "../../common/ipcChannelNames"

interface PlayerContainerProps {}
interface PlayerContainerState {
  src: string
}

export class PlayerContainer extends React.Component<{}, PlayerContainerState> {
  mediaPlayer: HTMLVideoElement
  constructor(props: PlayerContainerProps) {
    super(props)
    this.state = { src: "" }
    this.togglePlayPause = this.togglePlayPause.bind(this)
  }
  public handleSourceChanges(event: Event | DragEvent, pathToMedia: string) {
    const sourceURL = `file://${pathToMedia}`
    this.setState({ src: sourceURL })
  }
  public listenForPlayPauseToggle() {
    ipcRenderer.on(userHasToggledPlayPause, () => {
      if (this.mediaPlayer.paused) {
        this.mediaPlayer.play()
      } else {
        this.mediaPlayer.pause()
      }
    })
  }
  listenForJumpBackInTime() {
    ipcRenderer.on(jumpBackInTime, () => {
      const currentTime = this.mediaPlayer.currentTime
      const jumpBackIntervalInSeconds: number = 3
      const newTime = currentTime - jumpBackIntervalInSeconds
      console.log("current time is", currentTime)
      console.log("new time is ", newTime)
      if (newTime < 0) {
        this.mediaPlayer.currentTime === 0
      } else {
        this.mediaPlayer.currentTime = newTime
      }
    })
  }
  public handleJumpingInTime = (event: ElectronEvent, timeToJumpTo: number) => {
    console.log("I heard the time to jump to was", timeToJumpTo)
    console.log("this is", this)
    if (timeToJumpTo <= 0) {
      this.mediaPlayer.currentTime = 0
    } else if (timeToJumpTo >= this.mediaPlayer.duration) {
      this.mediaPlayer.currentTime = this.mediaPlayer.duration
    } else {
      this.mediaPlayer.currentTime = timeToJumpTo
    }
  }
  public listenForScrubVideoToTimecode() {
    ipcRenderer.on(scrubVideoToTimecodeRenderer, (event: ElectronEvent, timeToGoTo: number) => {
      this.handleJumpingInTime(event, timeToGoTo)
    })
  }
  public componentDidMount() {
    ipcRenderer.on(userHasChosenMediaFile, (event: Event, pathToMedia: string) => {
      this.handleSourceChanges(event, pathToMedia)
    })
    this.listenForPlayPauseToggle()
    // this.listenForJumpBackInTime()
    ipcRenderer.on(scrubVideoToTimecodeRenderer, this.handleJumpingInTime)
  }
  public componentWillUnmount() {
    ipcRenderer.removeListener(userHasChosenMediaFile, this.handleSourceChanges)
    ipcRenderer.removeListener(scrubVideoToTimecodeRenderer, this.handleJumpingInTime)
  }
  public togglePlayPause() {
    console.log("Play/pause has been toggled. `this` is", this)
    this.mediaPlayer.paused ? this.mediaPlayer.play() : this.mediaPlayer.pause()
  }
  public handleDragOver(event: DragEvent) {
    event.dataTransfer.dropEffect = "copy"
  }
  public handleDrop(event: DragEvent) {}
  render() {
    return (
      <div
        onDragOver={this.handleDragOver}
        onDrop={(event: DragEvent) => {
          const pathToMedia = event.dataTransfer.files[0].path
          console.log("pathToMedia is ", pathToMedia)
          console.log("`this` is ", this)
          this.handleSourceChanges(event, pathToMedia)
        }}
      >
        <video
          controls={true}
          onClick={this.togglePlayPause}
          ref={element => (this.mediaPlayer = element)}
          src={this.state.src}
          className="media-player"
        />
      </div>
    )
  }
}
