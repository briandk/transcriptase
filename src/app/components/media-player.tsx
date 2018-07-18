import React from "react"

class MediaPlayer extends React.Component<{}, {}> {
  render() {
    return <h2>I'm a child!</h2>
  }
}

export class MediaContainer extends React.Component<{}, {}> {
  render() {
    return (
      <div id="media-container">
        <h1>This is the parent</h1>
        <MediaPlayer />
      </div>
    )
  }
}
