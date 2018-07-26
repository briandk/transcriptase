import React from "react"
import videojs from "video.js"
import "../../styles/video-js.css"

export interface PlayerOptions {
  aspectRatio?: string
  autoplay?: boolean
  children?: string[]
  controls?: boolean
  defaultVolume?: number
  fluid?: boolean
  height?: number
  html5?: any
  language?: string
  loop?: boolean
  muted?: boolean
  notSupportedMessage?: string
  playbackRates: number[]
  plugins?: any
  poster?: string
  preload?: string
  sourceOrder?: boolean
  sources?: Source[]
  src?: string
  techOrder?: string[]
  width?: number
}

interface Source {
  type?: string
  src: string
}

export class VideoPlayer extends React.Component<PlayerOptions, {}> {
  private player: videojs.Player
  private videoNode: Node

  componentDidMount() {
    this.player = videojs(this.videoNode, this.props.sources as any, function onPlayerReady() {})
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video ref={node => (this.videoNode = node)} className="video-js">
            <source src={this.props.sources[0].src} />
          </video>
        </div>
      </div>
    )
  }
}
