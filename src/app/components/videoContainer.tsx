import React from "react"
import { Event, ipcRenderer } from "electron"
// import { PlayerOptions, Source } from "video.js"
// import { VideoPlayer, PlayerOptions } from "./videojs"
import { userHasChosenMediaFile } from "../ipcChannelNames"

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
    this.setState({ src: pathToMedia })
    console.log("path to media is ", this.state.src)
  }
  public componentDidMount() {
    ipcRenderer.on(userHasChosenMediaFile, (event: Event, pathToMedia: string) => {
      this.handleSourceChanges(event, pathToMedia)
    })
  }
  public componentWillUnmount() {
    ipcRenderer.removeListener(userHasChosenMediaFile, this.handleSourceChanges)
  }
  public togglePlayPause() {
    console.log("Play/pause has been toggled. `this` is", this)
    this.mediaPlayer.paused ? this.mediaPlayer.play() : this.mediaPlayer.pause()
  }
  render() {
    console.log("render was called. `this` is ", this)
    return (
      <video
        controls={true}
        onClick={this.togglePlayPause}
        ref={element => (this.mediaPlayer = element)}
        src={this.state.src}
      />
    )
  }
}
