import React from "react"
import { VideoPlayer } from "./videojs"

interface PlayerContainerProps {}
interface PlayerContainerState {
  pathToMedia: string
}

export class PlayerContainer extends React.Component<PlayerContainerProps, PlayerContainerState> {
  private videoJsOptions: any = {
    controls: true,
    autoplay: false,
    fluid: true,
    playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
    sources: [{ src: "/Users/briandk/Desktop/Iron Man 2 Trailer-oOzuBOefL8I.mp4" }],
  }
  constructor(props: PlayerContainerProps) {
    super(props)
  }
  render() {
    return <VideoPlayer {...this.videoJsOptions} />
  }
}
