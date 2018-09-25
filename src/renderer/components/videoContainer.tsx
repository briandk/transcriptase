import React, { DragEvent } from "react"
import { Event as ElectronEvent, ipcRenderer } from "electron"
// import { PlayerOptions, Source } from "video.js"
// import { VideoPlayer, PlayerOptions } from "./videojs"
import {
  userHasChosenMediaFile,
  userHasToggledPlayPause,
  jumpBackInTime,
  scrubVideoToTimecodeRenderer,
  scrubVideoToTimecodeMain,
} from "../../common/ipcChannelNames"
import { setAppState } from "../../common/appState"
import { PlaybackRateContainer } from "./playbackRateSlider"
import { ErrorBoundary } from "./ErrorBoundary"

interface PlayerContainerProps {}
interface PlayerContainerState {
  src: string
  playbackRate: number
}

export class PlayerContainer extends React.Component<{}, PlayerContainerState> {
  mediaPlayer: any
  constructor(props: PlayerContainerProps) {
    super(props)
    this.state = { src: "", playbackRate: null }
    this.togglePlayPause = this.togglePlayPause.bind(this)
    this.mediaPlayer = React.createRef<any>()
  }
  public handleSourceChanges(event: Event | DragEvent, pathToMedia: string) {
    const sourceURL = `file://${pathToMedia}`
    this.setState({ src: sourceURL, playbackRate: 1.0 })
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
    if (timeToJumpTo <= 0) {
      this.mediaPlayer.current.currentTime = 0
    } else if (timeToJumpTo >= this.mediaPlayer.current.duration) {
      this.mediaPlayer.current.currentTime = this.mediaPlayer.current.duration
    } else {
      this.mediaPlayer.current.currentTime = timeToJumpTo
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
  public setPlaybackRate = (rate: number) => {
    console.log("media player is", this.mediaPlayer)
    if (this.mediaPlayer.current && this.mediaPlayer.current.playbackRate) {
      this.mediaPlayer.current.playbackRate = rate
      this.setState({ playbackRate: rate })
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <div
          onDragOver={this.handleDragOver}
          onDrop={(event: DragEvent) => {
            const pathToMedia = event.dataTransfer.files[0].path
            this.handleSourceChanges(event, pathToMedia)
          }}
          className="media-grid"
        >
          <video
            controls={true}
            onClick={this.togglePlayPause}
            ref={this.mediaPlayer}
            src={this.state.src}
            onTimeUpdate={(event: any) => {
              setAppState("currentTime", event.target.currentTime.toString())
            }}
            className="media-player"
            id="media-player"
          />
          <PlaybackRateContainer
            playbackRate={this.state.playbackRate}
            setPlaybackRate={this.setPlaybackRate}
          />
        </div>
      </ErrorBoundary>
    )
    // return (
    //   <div className="wrapper">
    //     <div className="box a">A</div>
    //     <div className="box b">B</div>
    //     <div className="box c">C</div>
    //     <div className="box d">D</div>
    //   </div>
    // )
  }
}
