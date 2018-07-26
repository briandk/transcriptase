import React from "react"
import videojs from "video.js"
import { Player } from "video.js"
import { Props } from "popmotion/lib/action/vector"
import "../../styles/video-js.css"

export class MediaPlayer extends React.Component<Props, {}> {
  videoNode: Node
  player: Player
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log("onPlayerReady", this)
    })
  }

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
          <video ref={node => (this.videoNode = node)} className="video-js" />
        </div>
      </div>
    )
  }
}
