import React from "react"
import { Event, ipcRenderer } from "electron"
// import { PlayerOptions, Source } from "video.js"
// import { VideoPlayer, PlayerOptions } from "./videojs"
import {
  userHasChosenMediaFile,
  userHasToggledPlayPause,
  jumpBackInTime,
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
  public handleSourceChanges(event: Event, pathToMedia: string) {
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
  public componentDidMount() {
    ipcRenderer.on(userHasChosenMediaFile, (event: Event, pathToMedia: string) => {
      this.handleSourceChanges(event, pathToMedia)
    })
    this.listenForPlayPauseToggle()
    this.listenForJumpBackInTime()
  }
  public componentWillUnmount() {
    ipcRenderer.removeListener(userHasChosenMediaFile, this.handleSourceChanges)
  }
  public togglePlayPause() {
    console.log("Play/pause has been toggled. `this` is", this)
    this.mediaPlayer.paused ? this.mediaPlayer.play() : this.mediaPlayer.pause()
  }
  render() {
    return (
      <video
        controls={true}
        onClick={this.togglePlayPause}
        ref={element => (this.mediaPlayer = element)}
        src={this.state.src}
        className="media-player"
      />
    )
  }
}
