import React from "react"
import videojs from "video.js"
import { Player } from "video.js"
import { Props } from "../../../node_modules/popmotion/lib/action/vector"

// interface MediaContainerState {
//   pathToMedia: string
//   player: Player | null
// }

export class MediaContainer extends React.Component<{}, {}> {
  constructor(props: Props) {
    super(props)
    this.state = {
      pathToMedia: "",
      player: null,
    }
  }
  render() {
    return <MediaPlayer />
  }
}

interface MediaPlayerState {
  player: Player
}

class MediaPlayer extends React.Component<{}, MediaPlayerState> {
  player: Player
  videoNode: Node

  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    const videoNode = document.createElement("video")
    this.player = videojs(videoNode, {
      controls: true,
      autoplay: false,
      fluid: true,
      playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 2],
    } as any)
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      <div>
        <div data-vjs-player>
          <video ref={node => (this.videoNode = node)} className="video-js" />
        </div>
      </div>
    )
  }
}
