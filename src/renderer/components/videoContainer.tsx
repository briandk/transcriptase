import React, { DragEvent, SyntheticEvent } from "react"
import { Event as ElectronEvent, ipcRenderer } from "electron"
// import { PlayerOptions, Source } from "video.js"
// import { VideoPlayer, PlayerOptions } from "./videojs"
import {
  userHasChosenMediaFile,
  userHasToggledPlayPause,
  heresTheCurrentTime,
  insertCurrentTime,
  jumpBackInTime,
  scrubVideoToTimecodeRenderer,
  scrubVideoToTimecodeMain,
} from "../../common/ipcChannelNames"
import { setAppState } from "../../common/appState"

interface PlayerContainerProps {}
interface PlayerContainerState {
  src: string
}

export class PlayerContainer extends React.Component<{}, PlayerContainerState> {
  mediaPlayer: any
  constructor(props: PlayerContainerProps) {
    super(props)
    this.state = { src: "" }
    this.togglePlayPause = this.togglePlayPause.bind(this)
    this.mediaPlayer = React.createRef()
  }
  public handleSourceChanges(event: Event | DragEvent, pathToMedia: string) {
    const sourceURL = `file://${pathToMedia}`
    this.setState({ src: sourceURL })
  }
  public listenForPlayPauseToggle() {
    ipcRenderer.on(userHasToggledPlayPause, () => {
      this.togglePlayPause()
    })
  }
  listenForJumpBackInTime() {
    ipcRenderer.on(jumpBackInTime, () => {
      const currentTime = this.mediaPlayer.current.currentTime
      const jumpBackIntervalInSeconds: number = 3
      const timeToGoTo = currentTime - jumpBackIntervalInSeconds
      ipcRenderer.send(scrubVideoToTimecodeMain, timeToGoTo)
    })
  }
  public handleJumpingInTime = (event: ElectronEvent, timeToJumpTo: number) => {
    console.log("I heard the time to jump to was", timeToJumpTo)
    console.log("this is", this)
    if (timeToJumpTo <= 0) {
      this.mediaPlayer.current.currentTime = 0
    } else if (timeToJumpTo >= this.mediaPlayer.current.duration) {
      this.mediaPlayer.current.currentTime = this.mediaPlayer.current.duration
    } else {
      this.mediaPlayer.current.currentTime = timeToJumpTo
    }
  }
  // public listenForInsertCurrentTime() {
  //   ipcRenderer.on(insertCurrentTime, (event: ElectronEvent) => {
  //     ipcRenderer.sendTo(0, heresTheCurrentTime, this.mediaPlayer.current.currentTime)
  //   })
  // }
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
    ipcRenderer.on(scrubVideoToTimecodeRenderer, this.handleJumpingInTime)
    this.listenForJumpBackInTime()
    // this.listenForInsertCurrentTime()
  }
  public componentWillUnmount() {
    ipcRenderer.removeListener(userHasChosenMediaFile, this.handleSourceChanges)
    ipcRenderer.removeListener(scrubVideoToTimecodeRenderer, this.handleJumpingInTime)
    // ipcRenderer.removeListener(insertCurrentTime, this.listenForInsertCurrentTime)
  }
  public togglePlayPause() {
    if (this.mediaPlayer.current.paused) {
      const amountToJumpBackInSeconds = 0.5
      const timeToGoTo = this.mediaPlayer.current.currentTime - amountToJumpBackInSeconds
      ipcRenderer.send(scrubVideoToTimecodeMain, timeToGoTo)
      this.mediaPlayer.current.play()
    } else {
      this.mediaPlayer.current.pause()
    }
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
          ref={this.mediaPlayer}
          src={this.state.src}
          onTimeUpdate={(event: any) => {
            console.log("currentTime is", event.target.currentTime)
            setAppState("currentTime", event.target.currentTime.toString())
          }}
          className="media-player"
          id="media-player"
        />
      </div>
    )
  }
}
