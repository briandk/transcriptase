import React from "react"
import { Event, ipcRenderer } from "electron"
// import { PlayerOptions, Source } from "video.js"
import { VideoPlayer, PlayerOptions } from "./videojs"
import { userHasChosenMediaFile } from "../ipcChannelNames"

interface PlayerContainerProps {}

export class PlayerContainer extends React.Component<PlayerContainerProps, PlayerOptions> {
  baseOptions: any
  constructor(props: PlayerContainerProps) {
    super(props)
    this.state = {
      controls: true,
      autoplay: false,
      fluid: true,
      playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
      sources: [{ src: "" }],
    }
  }
  public handleSourceChanges(event: Event, pathToMedia: string) {
    this.setState({ sources: [{ src: pathToMedia }] } as any)
    console.log("path to media is ", this.state.sources)
  }
  public componentDidMount() {
    ipcRenderer.on(userHasChosenMediaFile, (event: Event, pathToMedia: string) => {
      this.handleSourceChanges(event, pathToMedia)
    })
  }
  public componentWillUnmount() {
    ipcRenderer.removeListener(userHasChosenMediaFile, this.handleSourceChanges)
  }
  render() {
    return <VideoPlayer {...this.state as any} />
  }
}
